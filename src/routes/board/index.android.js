import {View, Text, TouchableWithoutFeedback, Button} from 'react-native';
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

    render() {
        return (
            <View style={{flex: 1}}>
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
                    <Button
                        title={'undo'}
                        onPress={() => {
                            this.props.undo();
                        }}/>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around'}}>
                    <Grid style={{flex: 0.5, alignItems: 'center',}}>
                        {this.renderBoard(BOARD_SIZE)}
                    </Grid>

                </View>
                <Modal isVisible={this.props.modalVisibility}>
                    <Alert
                        bigTitle={this.props.bigTitle}
                        title={this.props.title}
                        noCallBack={this.props.noCallBack}
                        yesCallBack={this.props.yesCallBack}
                    />
                </Modal>
                <View style={{flex: 0.1, backgroundColor: 'red'}}/>
            </View>
        )
    }

}