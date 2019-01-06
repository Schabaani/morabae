import React, {Component} from 'react';
import {connect} from 'react-redux';
import ConfigScreen from './index';
import ShowToastHOC from '../../components/hoc/showToast';

class HowToPlayContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            startLevel: this.props.startLevel,
        }
    }



    render() {
        return (
            <ConfigScreen
            />
        );

    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const HowToPlayContainerWithShowToast = ShowToastHOC(HowToPlayContainer);
export default connect(mapStateToProps, mapDispatchToProps)(HowToPlayContainerWithShowToast);
