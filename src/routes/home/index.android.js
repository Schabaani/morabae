
import {View, Text, TouchableHighlight, Picker} from 'react-native';
import React, {Component} from 'react';
import {normalize} from '../../components/helpers/sizeNormalizer'
const {width} = require('Dimensions').get('window');
import Modal from "react-native-modal";

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
                    <Modal isVisible={this.props.modalVisibility}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex:1}}>
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
                        <Picker
                            selectedValue={-1}
                            style={{ height: 50, width: 200 }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) =>{
                                this.props.onRunCommand(this.props.identifiers.SelectStartLevel, itemValue)
                            }}>
                            <Picker.Item label={'please select a level'} value={-1}/>
                            {this.props.levelRanges.map((item, index) => (
                                <Picker.Item key={index} label={`${item}`} value={item}/>
                            ))}
                        </Picker>
                    </View>
                </View>
                </Modal>
            </View>
        )
    }

}
