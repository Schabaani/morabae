
import {View, Text, TouchableHighlight, Picker} from 'react-native';
import React, {Component} from 'react';
import {normalize, normalizeFont} from '../../components/helpers/sizeNormalizer'
import Modal from "react-native-modal";

export default class HomeScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                    <TouchableHighlight
                        style={{height:60, justifyContent:'center'}}
                        underlayColor="rgba(0, 0, 0, 0.3)"
                        onPress={()=>{
                            this.props.onRunCommand(this.props.identifiers.StartGame)
                        }}
                    >
                        <Text style={{textAlign: 'center', fontSize: normalizeFont(3)}}>Start game</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{height:60, justifyContent:'center'}}
                        underlayColor="rgba(0, 0, 0, 0.3)"
                        onPress={()=>{
                            this.props.onRunCommand(this.props.identifiers.ChangeConfig)
                        }}
                    >
                        <Text style={{textAlign: 'center', fontSize: normalizeFont(3)}}>Settings</Text>
                    </TouchableHighlight>
                    <Modal isVisible={this.props.modalVisibility}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <View style={
                            {
                                paddingTop: normalize(10),
                                borderRadius: normalize(10),
                                width: normalize(300) ,
                                height: '50%',
                                backgroundColor: 'white',
                                paddingLeft: normalize(20),
                            }
                        }
                        >
                        <Picker
                            selectedValue={-1}
                            style={{ height: 50, width: normalize(250) }}
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
