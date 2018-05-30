
import {View, Text, Button} from 'react-native';
import React, {Component} from 'react';

export default class HomeScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render(){
        var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
        return (
            <View>
                <Button
                    title={"say hello to " + this.props.name}
                    onPress={() => {
                        // this.props.dispatcher(this.props.changeName("Amish"));
                        this.props.changeName("Amish number is: "+ RandomNumber);
                        // alert(this.props.fetchDeptPrice('Amish'));
                    }}
                />
                <Button
                    title="change reducer"
                    onPress={() => {
                        this.props.dispatcher(this.props.changeReducer("home hastam"));
                    }}
                />
                <Text>Hello, {this.props.text} -Android</Text>
            </View>
        )
    }

}