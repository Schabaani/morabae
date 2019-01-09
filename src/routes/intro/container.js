import React, {Component} from 'react';
import {connect} from 'react-redux';
import IntroScreen from './index';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'
import {showRealAppDispatcher} from "./actionsRunner";

class IntroScreenContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            startLevel: this.props.startLevel,
        }
    }

    _onDone = () => {
        this.props.showRealApp();
        Actions.BoardScreen({type: 'reset'})
    };
    _onSkip = () => {
        this.props.showRealApp();
        Actions.BoardScreen({type: 'reset'})
    };


    render() {
        if (this.props.showRealAppState) {
            setTimeout(() => {
                Actions.BoardScreen({type: 'reset'});
            }, 0);
            return (null);
        }

        return (
            <IntroScreen
                onDone={this._onDone}
                // onSkip={this._onSkip}
            />
        );

    }
}

const mapStateToProps = (state) => {
    return {
        showRealAppState: state.introReducer.showRealApp
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showRealApp: () => dispatch(showRealAppDispatcher()),
    };
};

const IntroScreenContainerWithShowToast = ShowToastHOC(IntroScreenContainer);
export default connect(mapStateToProps, mapDispatchToProps)(IntroScreenContainerWithShowToast);
