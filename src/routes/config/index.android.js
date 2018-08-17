
import {View, Text, Button, TouchableHighlight, TextInput} from 'react-native';
import React, {Component} from 'react';
import {normalize} from '../../components/helpers/sizeNormalizer'
const {width} = require('Dimensions').get('window');

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            clickedItems: [],
            timePassed: 0
        }
    }

    render(){
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                    <TextInput
                        placeholder={'start level'}
                        value={this.props.startLevel.toString()}
                        keyboardType={'numeric'}
                        textAlign={'center'}
                    />
                    <TouchableHighlight
                        onPress={()=>{
                            this.props.saveConfig()
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>save start level</Text>
                    </TouchableHighlight>
            </View>
        )
    }

}
