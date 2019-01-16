import {
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Image,
    Dimensions
} from 'react-native';
import React, {Component} from 'react';
import {Col, Row, Grid} from "react-native-easy-grid";
import Alert from '../../components/alert';
import Modal from "react-native-modal";
import {COLOR} from "../../components/helpers/colorPalette";
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';
import {BOARD_SIZE} from "../../components/helpers/constants";
import {indexOf} from "../../components/helpers/utilities";

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    renderSize = (row, col) => {
        if (!this.props.gameCells.includes(indexOf(row, col))) {
            return 0;
        }
        if (this.props.selectedItems.includes(indexOf(row, col))) {
            return 30;
        }
        return 25

    };
    renderBoard = (boardSize) => {
        let colComponents = [];
        for (let col = 0; col < boardSize; col++) {
            let rowComponents = [];
            for (let row = 0; row < boardSize; row++) {
                let styles = this.renderBoarders(row, col);
                let size = this.renderSize(row, col);
                let cell = <Row style={{
                    flex: 1,
                    borderWidth: 0,
                    borderColor: 'white',
                    ...styles
                }}
                                size={10}
                                key={row}
                >
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.selectCell(row, col)
                    }}
                                              style={{flex: 1}}
                    >
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View
                                style={{
                                    width: size,
                                    height: size,
                                    borderColor: COLOR.CELL_BORDER,
                                    borderRadius: size / 2,
                                    backgroundColor: this.backGroundColor(row, col),
                                }}
                            >
                                <Text/>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </Row>;
                rowComponents.push(cell)
            }
            let cool = <Col key={col}>{rowComponents}</Col>;
            colComponents.push(cool);
        }
        return colComponents;
    };

    backGroundColor(row, col) {
        let gameCells = this.props.gameCells;
        let rowCol = indexOf(row, col);

        let color = COLOR.WHITE_CELL;

        if (gameCells.includes(rowCol)) {
            color = COLOR.GAME_CELLS;
        }
        if (this.props.selectedItems.includes(rowCol)) {
            if (this.props.selectedItems.indexOf(rowCol) === this.props.selectedItems.length - 1) {
                color = COLOR.YELLOW
            } else {
                color = COLOR.SELECTED_ITEM;
            }
        }
        return color;
    }

    renderBoarders = (row, col) => {
        let borderSize = 0.5;
        let style = {
            borderBottomWidth: borderSize,
            borderTopWidth: borderSize,
            borderLeftWidth: borderSize,
            borderRightWidth: borderSize
        };
        if (row === 0) {
            delete style.borderTopWidth;
        }
        if (row === 9) {
            delete style.borderBottomWidth;
        }
        if (col === 0) {
            delete style.borderLeftWidth;
        }
        if (col === 9) {
            delete style.borderRightWidth;
        }
        return style;
    };


    render() {
        return (
            <View style={{flex: 1, backgroundColor: COLOR.BACK_GROUND_COLOR}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 150}}>
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../assets/img/play.png')} style={{width: 30, height: 30}}/>
                        <Text style={{fontSize: 20}}>{this.props.lives}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                        <View style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            borderColor: 'white',
                            borderWidth: 2,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white'}}>{I18n.t(LanguageKeys.Level)}</Text>
                            <Text style={{color: 'white'}}>{this.props.level}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                        <Button
                            title={'undo'}
                            onPress={() => {
                                this.props.undo();
                            }}/>
                        <Button
                            title={'guid'}
                            onPress={() => {
                                this.props.help();
                            }}/>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <View
                        style={{
                            height: Dimensions.get('screen').width,
                            width: Dimensions.get('screen').width,
                            justifyContent: 'space-around',
                            padding: 10,
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                        <Grid style={{boarderWidth: 0, flex: 1, alignItems: 'center', backgroundColor: 'transparent'}}>
                            {this.renderBoard(BOARD_SIZE)}
                        </Grid>

                    </View>

                </View>
                <Modal isVisible={this.props.modalVisibility}>
                    <Alert
                        bigTitle={this.props.bigTitle}
                        title={this.props.title}
                        noCallBack={this.props.noCallBack}
                        yesCallBack={this.props.yesCallBack}
                        yesCallBackText={this.props.yesCallBackText}
                        level={this.props.level}
                    />
                </Modal>
                <View
                    style={{
                        flex: 1,
                        marginTop: 30,
                        backgroundColor: '#20262F',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                    <Image source={require('../../assets/img/coke.png')}
                           style={{flex: 1, resizeMode: 'stretch'}}/>
                </View>
            </View>
        )
    }

}