
import {View, Text, TouchableHighlight, TextInput} from 'react-native';
import React, {Component} from 'react';
export default class ConfigScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                    <TextInput
                        placeholder={'start level'}
                        value={this.props.startLevel? `${this.props.startLevel}` : undefined }
                        keyboardType={'numeric'}
                        textAlign={'center'}
                        onChangeText={(value) => {this.props.changeDefaultLevel(value)}}
                    />
                    <TouchableHighlight
                        style={{height:60, justifyContent:'center'}}
                        underlayColor="rgba(0, 0, 0, 0.3)"
                        onPress={()=>{
                            this.props.saveConfig()
                        }}
                    >
                        <Text style={{textAlign: 'center'}}>save default level</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{height:60, justifyContent:'center'}}
                        underlayColor="rgba(0, 0, 0, 0.3)"
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
