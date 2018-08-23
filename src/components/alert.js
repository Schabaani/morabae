import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {COLOR} from "./helpers/colorPalette";
import {normalizeFont, normalize} from "./helpers/sizeNormalizer";

export default class Alert extends Component<{}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.messageWrapper}>
                    <Text style={Styles.bigTitle}>{this.props.bigTitle}</Text>
                    <Text>{this.props.title}</Text>
                    <View style={Styles.buttonWrapper}>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.noCallBack();
                            }}
                            style={Styles.buttonView}
                        >
                            <Text style={Styles.buttonText}>No</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => {
                                this.props.yesCallBack()
                            }}
                            style={Styles.buttonView}
                        >
                            <Text style={Styles.buttonText}>Yes</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5
    },
    messageWrapper: {
        paddingTop: normalize(10),
        borderRadius: normalize(10),
        width: normalize(300),
        height: '50%',
        backgroundColor: 'white',
        paddingLeft: normalize(20),
    },
    buttonText: {
        color: COLOR.WHITE
    },
    buttonView: {
        backgroundColor: COLOR.BLACK,
        width: normalize(40),
        marginRight: normalize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigTitle: {
        fontWeight: "bold",
        fontSize: normalizeFont(2.5),
        paddingBottom: normalize(3)
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: normalize(100),
        marginTop: normalize(7)
    }
});