import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';
import {Col, Row, Grid} from "react-native-easy-grid";
import Alert from '../../components/alert';
const {width} = require('Dimensions').get('window');
import Modal from "react-native-modal";
import {COLOR} from "../../components/helpers/colorPalette";
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    renderBoard = (boardSize) => {
        let colComponents = [];
        for (let col = 0; col < boardSize; col++) {
            let rowComponents = [];
            for (let row = 0; row < boardSize; row++) {
                let cell = <Row style={{flex: 1, backgroundColor: this.backGroundColor(row, col)}}
                                size={10}
                                key={row}
                >
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.selectCell(row, col)
                    }}
                    >
                        <View
                            style={{flex: 1, borderColor: COLOR.CELL_BORDER, borderWidth: 0.5}}
                        >
                            <Text/>
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
        let rowCol = parseInt(row + '' + col);

        let color = COLOR.WHITE_CELL;

        if (gameCells.includes(rowCol)) {
            color = COLOR.GAME_CELLS;
        }
        if (this.props.selectedItems.includes(rowCol)) {
            color = COLOR.SELECTED_ITEM;
        }
        return color;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Grid style={{width: width, height: width, flex: 0.5}}>
                    {this.renderBoard(10)}
                </Grid>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{I18n.t(LanguageKeys.Timer)} </Text>
                        <Text> {this.props.timePassed} seconds</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{I18n.t(LanguageKeys.LeftToClick)} </Text>
                        <Text>{this.props.leftToClick}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{I18n.t(LanguageKeys.Lives)} </Text>
                        <Text>{this.props.lives}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{I18n.t(LanguageKeys.Level)} </Text>
                        <Text>{this.props.level}</Text>
                    </View>

                </View>
                <Modal isVisible={this.props.modalVisibility}>
                    <Alert
                        bigTitle={this.props.bigTitle}
                        title={this.props.title}
                        noCallBack={this.props.noCallBack}
                        yesCallBack={this.props.yesCallBack}
                    />
                </Modal>

            </View>
        )
    }

}