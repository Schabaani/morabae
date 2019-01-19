import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {COLOR} from "./helpers/colorPalette";
import {normalizeFont, normalize} from "./helpers/sizeNormalizer";

export default class Alert extends Component<{}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <View
                    style={{
                        width: 100,
                        height: 60,
                        backgroundColor: '#C9B091',
                        position: 'relative',
                        borderRadius: 20,
                        borderColor: 'gray',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderWidth: 5,
                        top: 50
                    }}><Text style={{fontFamily: 'DiodrumArabic-Bold'}}>{this.props.bigTitle}</Text></View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 180,
                    height: 70,
                    backgroundColor: '#333333',
                    position: 'relative',
                    borderRadius: 20,
                    borderColor: '#919191',
                    borderWidth: 5,
                    top: 25,
                    zIndex: 5
                }}>
                    <Image source={require('../assets/img/star.png')} style={{width: 50, height: 50}}/>
                    <Text style={{
                        fontSize: 40,
                        color: 'white',
                        fontFamily: 'DiodrumArabic-Semibold'
                    }}> {this.props.level} </Text>
                </View>
                <View style={{
                    width: '100%',
                    height: 140,
                    backgroundColor: COLOR.AJORY,
                    borderRadius: 40,
                    borderColor: '#919191',
                    borderWidth: 5
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        position: 'relative',
                        top: -20,
                        left: -20,
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.noCallBack()
                            }}

                        >
                            <View style={{
                                width: 30, height: 30,
                                borderRadius: 15,
                                backgroundColor: 'white',
                                justifyContent: 'center', alignItems: 'center',
                            }}
                            >

                                <Image source={require('../assets/img/cancel.png')} style={{width: 10, height: 10}}/>

                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 25,
                        color: 'white',
                        fontFamily: 'DiodrumArabic-Light'
                    }}>{this.props.title}</Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.yesCallBack()
                    }}
                >
                    <View style={{
                        width: 100,
                        height: 60,
                        backgroundColor: '#DF7C06',
                        position: 'relative',
                        borderRadius: 20,
                        borderColor: 'gray',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 5,
                        top: -25,
                        zIndex: 1,
                    }}>

                        <Text style={{fontFamily: 'DiodrumArabic-Bold'}}>{this.props.yesCallBackText}</Text>
                    </View>
                </TouchableWithoutFeedback>
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