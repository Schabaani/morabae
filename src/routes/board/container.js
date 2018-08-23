import React, {Component} from 'react';
import {connect} from 'react-redux';
import BoardScreen from './index';
import {changeLevelDispatcher, changeLivesDispatcher} from './actionsRunner';
import {generateGameCellsByLevel, calculateLives, findMoveAreas, makeRowAndCol} from './operations';
import {clone} from '../../components/helpers/utilities';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'

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
            gameState: 'selectInit', //  selectInit | play | gameOver | exit | complete
            modalVisibility: false,
            yesCallBack: undefined,
            noCallBack: undefined,
            bigTitle: '',
            title: '',
            timePassed: 0,
        };
        this.diagonallyMove = 2;
        this.straightMove = 3;
        this.timer = undefined;
    }

    setTimer(){
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount(){
        this.clearTimer();
    }

    clearTimer = () => {
        clearInterval(this.timer);
    };

    tick =() =>{
        this.setState({timePassed:this.state.timePassed + 1});
    };

    resetBoard(){
        this.setState({
            gameCells: [],
            passedTime: 0,
            selectedItems: [],
            gameState: 'selectInit',
            leftToClick: 0,
            modalVisibility: false,
            // bigTitle: '',
            // title: '',
            // yesCallBack: undefined,
            // noCallBack: undefined,
        })
    }

    selectCell =(row, col) =>{
        switch(this.state.gameState){
            case 'start':
               this.resetBoard();
               break;
            case 'selectInit':
                const cells = generateGameCellsByLevel(this.props.level,row,col);
                this.setTimer();
                this.setState({
                    gameCells: cells,
                    selectedItems:[cells[0]],
                    leftToClick: cells.length -1,
                    gameState: 'play',
                    timePassed:0,
                    // bigTitle: '',
                    // title: '',
                    // yesCallBack: undefined,
                    // noCallBack: undefined,
                });
                break;
            case 'play':
               this.play(row, col);
                break;
        }
    };

    isInPreviousCellArea = (previousElement, currentRow, currentCol) => {
        let cell = makeRowAndCol(previousElement);
        return findMoveAreas(cell.row, cell.col).indexOf(parseInt(currentRow + '' + currentCol)) > -1;
    };

    play(row, col){
        if(!this.state.gameCells.includes(parseInt(row + '' + col))){
            this.props.showToast('select another one');
            return;
        }
        if(this.isSelectedBefore(row, col)){
            return;
        }
        if(!this.isInPreviousCellArea(this.state.selectedItems[this.state.selectedItems.length-1], row, col)){
            this.runGameOver();
            return;
        }

        const a = parseInt(row + '' + col);
        if(this.state.gameCells.includes(a)){
            this.fillBoardNextStep(row,col);
        }
        // const can = this.canHaveAnotherMove(row, col);
        // if(can){
        //     this.fillBoardNextStep(row,col)
        // } else {
        //     this.runGameOver();
        // }
    }
    isSelectedBefore= (row, col)=>{
        // alert(row + '' + col)
        if(this.state.selectedItems.includes(parseInt(row + '' + col))){
            this.props.showToast('this cell has been selected before');
            return true;
        }
        return false;
    };

    fillBoardNextStep = (row, col) => {
        let cloneSelectedItems = clone(this.state.selectedItems);
        cloneSelectedItems.push(parseInt(row + '' + col));
        if(cloneSelectedItems.length === this.props.level + 1){
            this.winTheLevel();
        } else {
            this.setState({
                selectedItems:cloneSelectedItems,
                leftToClick: this.state.gameCells.length - cloneSelectedItems.length
            });
            const can = this.canHaveAnotherMove(row, col);
            if(!can){
                this.runGameOver();
            }
        }
    };
    winTheLevel = () => {
        this.props.changeLevel(this.props.level + 1);
        this.props.changeLives(calculateLives(this.props.lives, 0));
        this.clearTimer();
        this.setState({
            gameState: 'complete',
            modalVisibility: true,
            bigTitle: `You have completed level: ${this.props.level}`,
            title: 'Do you want to play next level?',
            yesCallBack: () => {this.continueGame()},
            noCallBack: () => {this.exit()},
            timePassed:0,
        });
    };
    runGameOver = () =>{
        this.props.changeLives(calculateLives(this.props.lives, this.state.leftToClick));
        this.clearTimer();
        this.setState({
            gameState: 'gameOver',
            modalVisibility: true,
            bigTitle: 'End Game',
            title: 'Do you want to play again',
            yesCallBack: () => {this.resetBoard()},
            noCallBack: () => {this.exit()},
        });
    };

    continueGame = () => {
        this.resetBoard();
    };

    exit = () =>{
        this.setState({
            gameState: 'exit',
            modalVisibility: false,
        });
        Actions.HomeScreen();
    };

    // yesCallBack = () =>{
    //     this.resetBoard();
    //     // this.setState({
    //     //     modalVisibility: false,
    //     //     gameState: 'start',
    //     // });
    // };
    //
    // noCallBack = () =>{
    //
    // };

    ismis = (row, col) =>{
        let gameCell = this.state.gameCells;
        let {selectedItems} = this.state;
        const parsed = this.parser(row, col);
        if(parsed === undefined){
            return false;
        }
        const res = gameCell.includes(parsed)
            && !selectedItems.includes(parsed);
        console.log('res is', res,
            'parsed', parsed,
            'game cell',gameCell.includes(parsed),
            'is in selectedItems',selectedItems.includes(parsed),
            'gameCell items', gameCell,
            'selected items', selectedItems,
        ) ;
        return res

    };

    canHaveAnotherMove(row, col) {
        let gameCell = this.state.gameCells;
        let {selectedItems} = this.state;
        let can = false;
        console.log('here:',row, col);
        if(this.ismis(row + this.straightMove, col)){
            can = true;
        }
        if(this.ismis(row - this.straightMove, col)){
            can = true;
        }
        if(this.ismis(row, col + this.straightMove)){
            can = true;
        }
        if(this.ismis(row, col - this.straightMove)){
            can = true;
        }
        if(this.ismis(row + this.diagonallyMove, col - this.diagonallyMove)){
            can = true;
        }
        if(this.ismis(row + this.diagonallyMove, col + this.diagonallyMove)){
            can = true;
        }
        if(this.ismis(row - this.diagonallyMove, col + this.diagonallyMove)){
            can = true;
        }
        if(this.ismis(row - this.diagonallyMove, col - this.diagonallyMove)){
            can = true;
        }

        return can;





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
        return can;
    }

    parser(row, col){
        if(!isNaN(row + '' + col) && parseInt(row + '' + col) > 0 && parseInt(row + '' + col) < 99){
          return parseInt(row + '' + col)
        }
          return undefined
    }

    render() {
        // const bindSelectCell = this.selectCell.bind(this)
        return (
            <BoardScreen
                gameCells={this.state.gameCells}
                selectedItems={this.state.selectedItems}
                selectCell={this.selectCell}
                lives={this.props.lives}
                leftToClick={this.state.leftToClick}
                level={this.props.level}
                bigTitle={this.state.bigTitle}
                title={this.state.title}
                yesCallBack={this.state.yesCallBack}
                noCallBack={this.state.noCallBack}
                gameState={this.state.gameState}
                modalVisibility={this.state.modalVisibility}
                timePassed={this.state.timePassed}
            />
        );

    }
}

/*
map state to props
state is your redux-store object
*/
const mapStateToProps = (state) => {
    let level = undefined;
    if(state.configReducer.mode){
        level = state.configReducer.currentLevel
    } else {
        level = state.boardReducer.currentLevel
    }
    return {
        level: level,
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

const BoardContainerWithShowToast = ShowToastHOC(BoardContainer);
/* clean way of setting up the connect. */
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainerWithShowToast);
