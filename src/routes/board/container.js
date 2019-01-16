import React, {Component} from 'react';
import {connect} from 'react-redux';
import BoardScreen from './index';
import {changeLevelDispatcher, changeLivesDispatcher} from './actionsRunner';
import {calculateLives, findMoveAreas, makeRowAndCol} from './operations';
import {clone, indexOf, parser} from '../../components/helpers/utilities';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';
import {BackHandler, NativeModules} from 'react-native';
import {BOARD_SIZE, DIAGONALLY_MOVE, STRAIGHT_MOVE, VARIATION_POINT} from "../../components/helpers/constants";
import {showIntroDispatcher, showRealAppDispatcher} from "../intro/actionsRunner";

class BoardContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = ()=>{
        if(Actions.currentScene === 'BoardScreen') {
            BackHandler.exitApp();
            return true;
        } else{
            this.props.showRealApp();
            Actions.pop();
            return false;
        }
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
            leftToClick: 0,
            undo: false
        };
        this.diagonallyMove = DIAGONALLY_MOVE;
        this.straightMove = STRAIGHT_MOVE;
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

    help = () => {
        this.props.showIntro();
        Actions.IntroScreen()
    };

    selectCell = (col, row) => {
        switch (this.state.gameState) {
            case 'start':
                this.resetBoard();
                break;
            case 'selectInit':
                const level = parseInt(this.props.level, 10);
                NativeModules.GameboardGenerator.generate({
                    boardSize: BOARD_SIZE,
                    variationPoint: VARIATION_POINT,
                    startingPoint: {col, row},
                    level
                })
                    .then(solutions => {
                        const solution = solutions[0];
                        let cells = solution.path.map((pos) => {
                            return indexOf(pos.col, pos.row)
                        });
                        this.setTimer();
                        this.setState({
                            gameCells: cells,
                            selectedItems: [indexOf(col, row)],
                            leftToClick: cells.length - 1,
                            gameState: 'play',
                            timePassed: 0,
                        });
                    });
                break;
            case 'play':
                this.play(col, row);
                break;
        }
    };

    isInPreviousCellArea = (previousElement, currentRow, currentCol) => {
        let cell = makeRowAndCol(previousElement);
        return findMoveAreas(cell.row, cell.col).indexOf(indexOf(currentRow, currentCol)) > -1;
    };

    play(row, col) {
        if (!this.state.gameCells.includes(indexOf(row, col))) {
            this.props.showToast(I18n.t(LanguageKeys.SelectAnotherOne));
            return;
        }
        if (this.isSelectedBefore(row, col)) {
            return;
        }
        if (!this.isInPreviousCellArea(this.state.selectedItems[this.state.selectedItems.length - 1], row, col)) {
            this.props.showToast(I18n.t(LanguageKeys.WrongPoint));
            this.props.changeLives(this.props.lives - 1);
            if (this.props.lives - 1 <= 0) {
                this.runGameOver();
            }
            return;
        }

        const a = indexOf(row, col);
        if (this.state.gameCells.includes(a)) {
            this.fillBoardNextStep(row, col);
        }
    }

    isSelectedBefore = (row, col) => {
        if (this.state.selectedItems.includes(indexOf(row, col))) {
            this.props.showToast(I18n.t(LanguageKeys.SelectedBefore));
            return true;
        }
        return false;
    };

    // fillBoardNextStep = (row, col) => {
    //     this.state.selectedItems.push(indexOf(row, col));
    //     let nSelectedItems = this.state.nSelectedItems + 1;
    //     if (nSelectedItems === this.props.level) {
    //         this.winTheLevel();
    //     } else {
    //         this.setState({
    //             nSelectedItems: nSelectedItems,
    //             leftToClick: this.state.gameCells.length - nSelectedItems
    //         });
    //         if (!this.canHaveAnotherMove(row, col)) {
    //             this.runGameOver();
    //         }
    //     }
    // };

    fillBoardNextStep = (row, col) => {
        let cloneSelectedItems = clone(this.state.selectedItems);
        cloneSelectedItems.push(indexOf(row, col));
        if (cloneSelectedItems.length === this.props.level + 1) {
            this.winTheLevel();
        } else {
            this.setState({
                selectedItems: cloneSelectedItems,
                leftToClick: this.state.gameCells.length - cloneSelectedItems.length
            }, () => {
                if (!this.canHaveAnotherMove(row, col)) {
                    this.runGameOver();
                }
            });
        }
    };

    winTheLevel = () => {
        this.props.changeLevel(this.props.level + 1);
        this.props.changeLives(calculateLives(this.props.lives, 0));
        this.clearTimer();
        this.setState({
            gameState: 'complete',
            modalVisibility: true,
            undo:false,
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
            undo: false,
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
        const parsed = parser(row, col);
        if (parsed === undefined) {
            return false;
        }
        return gameCell.includes(parsed)
            && !selectedItems.includes(parsed);
    };

    undo = () => {
        if (!this.state.undo && this.state.selectedItems.length > 1) {
            this.setState({
                undo: true,
                selectedItems: this.state.selectedItems.slice(0, this.state.selectedItems.length - 1)
            });
            return;
        }
        this.props.showToast(I18n.t(LanguageKeys.OnlyOneUndo));
    };

    canHaveAnotherMove(row, col) {
        return (
            this.isClickable(row + this.straightMove, col) ||
            this.isClickable(row - this.straightMove, col) ||
            this.isClickable(row, col + this.straightMove) ||
            this.isClickable(row, col - this.straightMove) ||
            this.isClickable(row + this.diagonallyMove, col - this.diagonallyMove) ||
            this.isClickable(row + this.diagonallyMove, col + this.diagonallyMove) ||
            this.isClickable(row - this.diagonallyMove, col + this.diagonallyMove) ||
            this.isClickable(row - this.diagonallyMove, col - this.diagonallyMove)
        );
    }

    render() {
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
                undo={this.undo}
                help={this.help}
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
        showIntro: () => dispatch(showIntroDispatcher()),
        showRealApp: () => dispatch(showRealAppDispatcher()),
    };
};

const BoardContainerWithShowToast = ShowToastHOC(BoardContainer);
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainerWithShowToast);
