import React, {Component} from 'react';
import AppIntroSlider from "react-native-app-intro-slider";
import {StyleSheet, View, Text} from "react-native";
import {COLOR} from "../../components/helpers/colorPalette";


export default class ConfigScreen extends Component<{}> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: COLOR.BACK_GROUND_COLOR, }}>
                <AppIntroSlider slides={this.props.slides}
                                onDone={this.props.onDone}
                                doneLabel={'برو تو بازی'}
                                nextLabel={'بعدی'}
                                prevLabel={'قبلی'}
                                showPrevButton={true}
                                onSlideChange={this.props.onSlideChange}
                                style={{flex:0.5}}
                />
                {this.props.showSkip &&
                <Text onPress={() => {
                    this.props.onDone()
                }}
                      style={{
                          textAlign: 'center',
                          color: COLOR.SELECTED_ITEM,
                          position: 'absolute',
                          bottom: 10,
                          left: '40%',
                          fontSize: 20
                      }}
                >
                    برو تو بازی
                </Text>

                }
            </View>
        )
    }

}
