import React, {Component} from 'react';
import {View} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'


export default (Comp) => {

    return class ShowToastHOC extends Component<{}> {
        static navigationOptions = {
            header: null,

        };
        constructor(props) {
            super(props);
        }

        showToast = (message, duration = DURATION.LENGTH_LONG * 2 ) => {
            this.refs.toast.show(message, duration);
        };

        render() {
            const props = this.props;
            const children = this.props.children;
            return (
                <View style={{flex: 1}}>
                    <Comp {...props} showToast={this.showToast}>
                        {children}
                    </Comp>
                    <Toast ref="toast"/>
                </View>
            )
        }
    };
};
