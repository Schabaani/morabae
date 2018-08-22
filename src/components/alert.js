import React, {Component} from 'react';
import {View, Text, Button, TouchableHighlight, TextInput, StyleSheet} from 'react-native';

export default class Alert extends Component<{}> {

    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex:0.5}}>
                <View style={
                        {
                            paddingTop: 10, 
                            borderRadius: 10, 
                            width: 300 ,
                            height: '50%',
                            backgroundColor: 'white',
                            paddingLeft: 20,
                        }
                    }
                    >
                    <Text style={{fontWeight: "bold", fontSize: 18, paddingBottom:3}}>{this.props.bigTitle}</Text>
                    <Text>{this.props.title}</Text>
                    <View style={{flexDirection: 'row', width: 100, marginTop:7}}>
                        <TouchableHighlight
                            onPress={
                                () =>{
                                    this.props.noCallBack();
                                }
                            }
                            style={{backgroundColor: 'black', width: 40, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
                        >
                                <Text style={{color: 'white'}}>No</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={
                                () =>{
                                    this.props.yesCallBack();
                                }
                            }
                            style={{backgroundColor: 'black', width: 40, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text style={{color: 'white'}}>Yes</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        );

    }
}