import {View, Text, TouchableHighlight, TextInput} from 'react-native';
import React, {Component} from 'react';
import {normalizeFont} from "../../components/helpers/sizeNormalizer";
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';
import CommonStyles from '../../components/helpers/commonStyle';
import Styles from "./styles.android";
import {COLOR} from "../../components/helpers/colorPalette";

export default class ConfigScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <TextInput
                    style={{fontSize: normalizeFont(3)}}
                    placeholder={I18n.t(LanguageKeys.StartLevelPlaceholder)}
                    value={this.props.startLevel ? `${this.props.startLevel}` : undefined}
                    keyboardType={'numeric'}
                    textAlign={'center'}
                    onChangeText={(value) => {
                        this.props.changeDefaultLevel(value)
                    }}
                />
                <TouchableHighlight
                    style={CommonStyles.buttonView}
                    underlayColor={COLOR.TOUCHABLE_OPACITY_BUTTON}
                    onPress={() => {
                        this.props.saveConfig()
                    }}
                >
                    <Text style={CommonStyles.buttonText}>{I18n.t(LanguageKeys.SaveDefaultLevel)}</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={CommonStyles.buttonView}
                    underlayColor={COLOR.TOUCHABLE_OPACITY_BUTTON}
                    onPress={() => {
                        this.props.resetConfig()
                    }}
                >
                    <Text style={CommonStyles.buttonText}>{I18n.t(LanguageKeys.ResetDefaultLevel)}</Text>
                </TouchableHighlight>
            </View>
        )
    }

}
