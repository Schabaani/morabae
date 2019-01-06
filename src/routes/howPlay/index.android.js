import {View, Image} from 'react-native';
import React, {Component} from 'react';
import Styles from "./styles.android";

export default class ConfigScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <Image
                    source={require('../../assets/img/play.png')}
                />
            </View>
        )
    }

}
