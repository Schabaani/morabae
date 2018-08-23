import {View, Text, TouchableHighlight, TextInput} from 'react-native';
import React, {Component} from 'react';
import {normalizeFont} from "../../components/helpers/sizeNormalizer";
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';


export default class ConfigScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
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
                    style={{height: 60, justifyContent: 'center'}}
                    underlayColor="rgba(0, 0, 0, 0.3)"
                    onPress={() => {
                        this.props.saveConfig()
                    }}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontSize: normalizeFont(3)
                    }}>{I18n.t(LanguageKeys.SaveDefaultLevel)}</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{height: 60, justifyContent: 'center'}}
                    underlayColor="rgba(0, 0, 0, 0.3)"
                    onPress={() => {
                        this.props.resetConfig()
                    }}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontSize: normalizeFont(3)
                    }}>{I18n.t(LanguageKeys.ResetDefaultLevel)}</Text>
                </TouchableHighlight>
            </View>
        )
    }

}
