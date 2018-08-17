import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BoardScreen from './index';
import {changeLevel} from './actions'
import {changeLevelDispatcher, changeLivesDispatcher} from './actionsRunner';
import {generateGameCellsByLevel, calculateLives} from './operations';
import {clone} from '../../components/helpers/utilities';
import ShowToastHOC from '../../components/hoc/showToast';

class BoardContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            gameCells: [],
            passedTime: 0,
            selectedItems: [],
            gameState: 'start' // start | selectInit | play | gameOver | exit
        };
        this.diagonallyMove = 2;
        this.straightMove = 3;

    }

    resetBoard(){
        this.setState({
            gameCells: [],
            passedTime: 0,
            selectedItems: [],
            gameState: 'selectInit',
            leftToClick: 0,
        })
    }

    selectCell(row, col){
        switch(this.state.gameState){
            case 'start':
               this.resetBoard();
               break;
            case 'selectInit':
                const cells = generateGameCellsByLevel(this.props.level,row,col);
                this.setState({
                    gameCells: cells,
                    selectedItems:[cells[0]],
                    leftToClick: cells.length -1,
                    gameState: 'play'
                });
                break;
            case 'play':
               this.play(row, col)
                break;    
        }
    }

    play(row, col){
        if(!this.state.gameCells.includes(parseInt(row + '' + col))){
            this.props.showToast('select another one');
            return;
        }
        const can = this.canHaveAnotherMove(row, col)
        // TODO revert it 
        if(!can){
            let cloneSelectedItems = clone(this.state.selectedItems)
            cloneSelectedItems.push(parseInt(row + '' + col))
            if(cloneSelectedItems.length == this.props.level + 1){
                this.props.showToast('winner');
                this.props.changeLevel(this.props.level + 1)
                this.props.changeLives(calculateLives(this.props.lives, 0))
                this.resetBoard()
            } else {
                this.setState({
                    selectedItems:cloneSelectedItems,
                    leftToClick: this.state.gameCells.length - cloneSelectedItems.length
                });
            }
            

        } else {
            this.props.showToast('game over');
        }
    }

    canHaveAnotherMove(row, col) {
        let gameCell = this.state.gameCells
        if(this.state.selectedItems.includes(parseInt(row + '' + col))){
            return false;
        }
        let can = false;
        if(gameCell.includes(this.parser(row + this.straightMove, col))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - this.straightMove, col))){
            can = true;
        }
        if(gameCell.includes(this.parser(row, col + this.straightMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row, col - this.straightMove))){
            can = true;
        }
        // 
        if(gameCell.includes(this.parser(row + this.diagonallyMove, col - this.diagonallyMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row + this.diagonallyMove, col + this.diagonallyMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - this.diagonallyMove, col + this.diagonallyMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - this.diagonallyMove, col - this.diagonallyMove))){
            can = true;
        }
    }

    parser(row, col){
        if(!isNaN(row + '' + col) && parseInt(row + '' + col) > 0 && parseInt(row + '' + col) < 99){
          return parseInt(row + '' + col)
        }
          return undefined
    }

    render() {
        const bindSelectCell = this.selectCell.bind(this)
        return (
            <BoardScreen
                gameCells={this.state.gameCells}
                selectedItems={this.state.selectedItems}
                selectCell={bindSelectCell}
                lives={this.props.lives}
                leftToClick={this.state.leftToClick}
                level={this.props.level}
            />
        );

    }
}

/*
map state to props
state is your redux-store object
*/
const mapStateToProps = (state) => {
    return {
        level: state.boardReducer.level,
        lives: state.boardReducer.lives
    };
};


/*
connect dispatch to props so that you can call the methods from the active props scope.
The defined method `addTodo` can be called in the scope of the components props.
*/
const mapDispatchToProps = (dispatch) => {
    return {
        changeLevel: (level) => dispatch(changeLevelDispatcher(level)),
        changeLives: (lives) => dispatch(changeLivesDispatcher(lives)),
    };
};

const BoardContainerWithShowToast = ShowToastHOC(BoardContainer)
/* clean way of setting up the connect. */
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainerWithShowToast);
