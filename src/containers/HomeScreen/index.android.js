
import {View, Text, Button} from 'react-native';
import React, {Component} from 'react';

export default class HomeScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View>
                <Button
                    title="say hello"
                    onPress={() => {
                        this.props.dispatcher(this.props.changeName("Amish"));
                        alert(this.props.fetchDeptPrice('Amish'));
                    }}
                />
                <Text>Hello, {this.props.text} -Android</Text>
            </View>
        )
    }

}