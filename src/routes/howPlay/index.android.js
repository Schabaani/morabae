import {View, Image, Text} from 'react-native';
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
                <View style={{backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>در هر مرحله فقط یک بار می توانید از دکمه بازگشت استفاده کنید.</Text>
                    <Text>اگر بر روی نقطه سبز اشتباه کلیک کنید یک جوووون (به همین غلظت) از دست می دهید.</Text>
                    <Text>اگر جووونت صفر بشه به نزدیک ترین مرحله مضرب ۳ سقوط می کنید.</Text>
                </View>
            </View>
        )
    }

}
