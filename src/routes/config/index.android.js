
import {View, Text, Button, TouchableHighlight, TextInput} from 'react-native';
import React, {Component} from 'react';
import {normalize} from '../../components/helpers/sizeNormalizer'
const {width} = require('Dimensions').get('window');

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                    <TextInput
                        placeholder={'start level'}
                        value={this.props.startLevel.toString()}
                        keyboardType={'numeric'}
                        textAlign={'center'}
                        onValueChange={(value) => {this.props.changeDefaultLevel(value)}}
                    />
                    <TouchableHighlight
                        onPress={()=>{
                            this.props.saveConfig()
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>save default level</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={()=>{
                            this.props.resetConfig()
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>reset default level</Text>
                    </TouchableHighlight>
            </View>
        )
    }

}
