import React, {Component} from 'react';
import AppIntroSlider from "react-native-app-intro-slider";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'قواعد حرکتی',
        text: 'Description.\nSay something cool',
        image: require('../../assets/img/play.png'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'محاسبه امتیاز',
        text: 'Other cool stuff',
        image: require('../../assets/img/play.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'کسر جان',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../../assets/img/play.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];

export default class ConfigScreen extends Component<{}> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <AppIntroSlider slides={slides}
                            onDone={this.props.onDone}
                            // onSkip={this.props.onSkip}
                            doneLabel={'برو تو بازی'}
                            nextLabel={'بعدی'}
                            skipLabel={'بی حیال'}
                            showSkipButton={true}
            />
        )
    }

}
