import {View, Text, TouchableHighlight, Picker, TextInput, Button, ListView} from 'react-native';
import React, {Component} from 'react';
import Modal from "react-native-modal";
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';
import Styles from "./styles.android";
import CommonStyles from '../../components/helpers/commonStyle'
import {COLOR} from "../../components/helpers/colorPalette";

export default class HomeScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <TouchableHighlight
                    style={CommonStyles.buttonView}
                    underlayColor={COLOR.TOUCHABLE_OPACITY_BUTTON}
                    onPress={() => {
                        this.props.onRunCommand(this.props.identifiers.SwitchUser)
                    }}
                >
                    <Text style={CommonStyles.buttonText}>Switch User</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={CommonStyles.buttonView}
                    underlayColor={COLOR.TOUCHABLE_OPACITY_BUTTON}
                    onPress={() => {
                        this.props.onRunCommand(this.props.identifiers.StartGame)
                    }}
                >
                    <Text style={CommonStyles.buttonText}>Start game</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={CommonStyles.buttonView}
                    underlayColor={COLOR.TOUCHABLE_OPACITY_BUTTON}
                    onPress={() => {
                        this.props.onRunCommand(this.props.identifiers.ChangeConfig)
                    }}
                >
                    <Text style={CommonStyles.buttonText}>Settings</Text>
                </TouchableHighlight>
                <Modal isVisible={this.props.isSwitchUser}>
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={Styles.pickerWrapper}>
                            <ListView
                                dataSource={this.props.dataSource}
                                renderRow={(item) =>
                                    <View>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.props.onRunCommand(this.props.identifiers.switchCurrentUser, item.uuid)
                                            }}>
                                            <Text>{item.name}</Text>
                                        </TouchableHighlight>
                                    </View>
                                }
                            />
                            <TextInput
                                onChangeText={(text) => {
                                    this.props.onRunCommand(this.props.identifiers.ChangeUserName, text);
                                }}
                            />
                            <Button
                                title={'create'}
                                onPress={() => {
                                    this.props.onRunCommand(this.props.identifiers.AddUser);
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.props.modalVisibility}
                       onBackButtonPress={() => {
                           this.props.onRunCommand(this.props.identifiers.CancelSelectLevel)
                       }}
                       onBackdropPress={() => {
                           this.props.onRunCommand(this.props.identifiers.CancelSelectLevel)
                       }}
                >
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={Styles.pickerWrapper}>
                            <Picker
                                selectedValue={-1}
                                style={{height: 50}}
                                mode={'dropdown'}
                                onValueChange={(itemValue) => {
                                    this.props.onRunCommand(this.props.identifiers.SelectStartLevel, itemValue)
                                }}>
                                <Picker.Item label={I18n.t(LanguageKeys.SelectOneLevel)} value={-1}/>
                                {this.props.levelRanges.map((item, index) => (
                                    <Picker.Item key={index} label={`${item}`} value={item}/>
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
