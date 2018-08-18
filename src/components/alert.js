import React, {Component} from 'react';
import {View, Text, Button, TouchableHighlight, TextInput, StyleSheet} from 'react-native';

export default class Alert extends Component<{}> {

    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <View style={{ alignItems: 'center'}}>
                <View style={
                        {
                            marginTop: '40%', 
                            borderRadius: 10, width: 300 ,
                            alignItems: 'center',
                        }
                    }
                    >
                    <Text>{this.props.bigTitle}</Text>
                    <Text>{this.props.title}</Text>
                    <View style={{flexDirection: 'row', width: 100, height:100}}>
                        <TouchableHighlight
                            onPress={
                                () =>{
                                    this.props.noCallBack();
                                }
                            }
                        >
                                <Text>No</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={
                                () =>{
                                    this.props.yesCallBack();
                                }
                            }   
                        >
                            <Text>Yes</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        );

    }
}