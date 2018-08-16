import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Button
                    title="say hello"
                    onPress={() => {this.props.dispatcher(this.props.changeName("Amir"))}}
                />
                <Text>Hello, {this.props.text} - iOS</Text>
            </View>
        )
    }

}