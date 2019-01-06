import React, {Component} from 'react';
import {connect} from 'react-redux';
import BoardScreen from './index';
import {changeLevelDispatcher, changeLivesDispatcher} from './actionsRunner';
import {calculateLives, findMoveAreas, makeRowAndCol} from './operations';
import {clone} from '../../components/helpers/utilities';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';
import {NativeModules} from 'react-native';

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

    setTimer() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    clearTimer = () => {
        clearInterval(this.timer);
    };

    tick = () => {
        this.setState({timePassed: this.state.timePassed + 1});
    };

    resetBoard() {
        this.setState({
            gameCells: [],
            passedTime: 0,
            selectedItems: [],
            gameState: 'selectInit',
            leftToClick: 0,
            modalVisibility: false,
        });
    }

    selectCell = (row, col) => {
        switch (this.state.gameState) {
            case 'start':
                this.resetBoard();
                break;
            case 'selectInit':
                const boardSize = 10;
                const variationPoint = 15;
                const level = parseInt(this.props.level, 10);
                console.log('cell', row, col);
                NativeModules.GameboardGenerator.generate({
                    boardSize,
                    variationPoint,
                    startingPoint: {col, row},
                    level
                })
                    .then(solutions => {
                        const solution = solutions[0];
                        console.log(solution);
                       let  cells = solution.path.map((pos)=>{
                            return parseInt(pos.col + "" + pos.row, 10)
                        });
                        this.setTimer();
                        this.setState({
                            gameCells: cells,
                            selectedItems: [parseInt(col + "" + row, 10)],
                            leftToClick: solution.length - 1,
                            gameState: 'play',
                            timePassed: 0,
                        });
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

    play(row, col) {
        if (!this.state.gameCells.includes(parseInt(row + '' + col))) {
            this.props.showToast(I18n.t(LanguageKeys.SelectAnotherOne));
            return;
        }
        if (this.isSelectedBefore(row, col)) {
            return;
        }
        if (!this.isInPreviousCellArea(this.state.selectedItems[this.state.selectedItems.length - 1], row, col)) {
            this.runGameOver();
            return;
        }

        const a = parseInt(row + '' + col);
        if (this.state.gameCells.includes(a)) {
            this.fillBoardNextStep(row, col);
        }
    }

    isSelectedBefore = (row, col) => {
        if (this.state.selectedItems.includes(parseInt(row + '' + col))) {
            this.props.showToast(I18n.t(LanguageKeys.SelectedBefore));
            return true;
        }
        return false;
    };

    fillBoardNextStep = (row, col) => {
        let cloneSelectedItems = clone(this.state.selectedItems);
        cloneSelectedItems.push(parseInt(row + '' + col));
        if (cloneSelectedItems.length === this.props.level + 1) {
            this.winTheLevel();
        } else {
            this.setState({
                selectedItems: cloneSelectedItems,
                leftToClick: this.state.gameCells.length - cloneSelectedItems.length
            });
            const can = this.canHaveAnotherMove(row, col);
            if (!can) {
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
            bigTitle: `${I18n.t(LanguageKeys.CompleteLevel)}: ${this.props.level}`,
            title: I18n.t(LanguageKeys.DoYouWantPlayNext),
            yesCallBack: () => {
                this.continueGame()
            },
            noCallBack: () => {
                this.exit()
            },
            timePassed: 0,
        });
    };
    runGameOver = () => {
        this.props.changeLives(calculateLives(this.props.lives, this.state.leftToClick));
        this.clearTimer();
        this.setState({
            gameState: 'gameOver',
            modalVisibility: true,
            bigTitle: I18n.t(LanguageKeys.EndGame),
            title: I18n.t(LanguageKeys.PlayAgain),
            yesCallBack: () => {
                this.resetBoard()
            },
            noCallBack: () => {
                this.exit()
            },
        });
    };

    continueGame = () => {
        this.resetBoard();
    };

    exit = () => {
        this.setState({
            gameState: 'exit',
            modalVisibility: false,
        });
        Actions.HomeScreen();
    };

    isClickable = (row, col) => {
        let gameCell = this.state.gameCells;
        let {selectedItems} = this.state;
        const parsed = this.parser(row, col);
        if (parsed === undefined) {
            return false;
        }
        return gameCell.includes(parsed)
            && !selectedItems.includes(parsed);
    };

    canHaveAnotherMove(row, col) {
        let can = false;
        if (this.isClickable(row + this.straightMove, col)) {
            can = true;
        }
        if (this.isClickable(row - this.straightMove, col)) {
            can = true;
        }
        if (this.isClickable(row, col + this.straightMove)) {
            can = true;
        }
        if (this.isClickable(row, col - this.straightMove)) {
            can = true;
        }
        if (this.isClickable(row + this.diagonallyMove, col - this.diagonallyMove)) {
            can = true;
        }
        if (this.isClickable(row + this.diagonallyMove, col + this.diagonallyMove)) {
            can = true;
        }
        if (this.isClickable(row - this.diagonallyMove, col + this.diagonallyMove)) {
            can = true;
        }
        if (this.isClickable(row - this.diagonallyMove, col - this.diagonallyMove)) {
            can = true;
        }
        return can;
    }

    parser(row, col) {
        if (!isNaN(row + '' + col) && parseInt(row + '' + col) > 0 && parseInt(row + '' + col) < 99) {
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


const mapStateToProps = (state) => {
    let level = undefined;
    if (state.configReducer.mode) {
        level = state.configReducer.currentLevel
    } else {
        level = state.boardReducer.currentLevel
    }
    return {
        level: level,
        lives: state.boardReducer.lives
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        changeLevel: (level) => dispatch(changeLevelDispatcher(level)),
        changeLives: (lives) => dispatch(changeLivesDispatcher(lives)),
    };
};

const BoardContainerWithShowToast = ShowToastHOC(BoardContainer);
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainerWithShowToast);
