
import {View, Text, Button, TouchableHighlight, TextInput} from 'react-native';
import React, {Component} from 'react';
import {normalize} from '../../components/helpers/sizeNormalizer'
const {width} = require('Dimensions').get('window');

export default class HomeScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                    <TouchableHighlight
                        onPress={()=>{
                            this.props.onRunCommand(this.props.identifiers.StartGame)
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>Start game</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={()=>{
                            this.props.onRunCommand(this.props.identifiers.ChangeConfig)
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>Settings</Text>
                    </TouchableHighlight>
            </View>
        )
    }

}
