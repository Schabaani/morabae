import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeScreen from './index';
import {Actions} from 'react-native-router-flux';
import {changeLevelDispatcher} from '../board/actionsRunner'

class HomeContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisibility: false
        };
    }

    onRunCommand = (identifier, value = undefined) => {
        switch (identifier) {
            case IDENTIFIERS.ChangeConfig:
                Actions.ConfigScreen();
                break;
            case IDENTIFIERS.StartGame:
                this.setState({
                    modalVisibility: true,
                });
                break;
            case IDENTIFIERS.SelectStartLevel:
                this.setState({
                    modalVisibility: false,
                });
                this.props.selectCurrentLevel(value);
                Actions.BoardScreen();
                break;
            case IDENTIFIERS.CancelSelectLevel:
                this.setState({
                    modalVisibility: false,
                });
                break;
        }

    };


    render() {
        return (
            <HomeScreen
                identifiers={IDENTIFIERS}
                onRunCommand={this.onRunCommand}
                modalVisibility={this.state.modalVisibility}
                levelRanges={this.props.levelRanges}
            />
        );

    }
}

const mapStateToProps = (state) => {
    let levelRanges = [];
    let from = undefined;
    let to = undefined;
    if (state.configReducer.mode) {
        from = state.configReducer.startLevel;
        to = state.configReducer.completedLevel;

    } else {
        from = 1;
        to = state.boardReducer.completedLevel;
    }
    const len = to - from + 1;

    for (let i = 0; i < len; i++) {
        levelRanges.push(from++);
    }
    return {
        levelRanges: levelRanges,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCurrentLevel: (level) => dispatch(changeLevelDispatcher(level)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

const IDENTIFIERS = {
    StartGame: "StartGame",
    ChangeConfig: "ChangeConfig",
    SelectStartLevel: "SelectStartLevel",
    CancelSelectLevel: "CancelSelectLevel",
};
