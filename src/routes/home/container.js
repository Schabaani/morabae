import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeScreen from './index';
import {Actions} from 'react-native-router-flux';
import {changeLevelDispatcher} from '../board/actionsRunner';
import {addUserDispatch, switchCurrentUserDispatch} from './actionsRunner';
import {ListView} from "react-native";

class HomeContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modalVisibility: false,
            isSwitchUser: false,
            userName: '',
            dataSource: this.ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        let that = this;
        let users = Object.keys(this.props.users).map(function(key) {
            return {uuid: key, name: that.props.users[key]};
        });
        this.setState({
            isSwitchUser: !Object.keys(this.props.users).length > 0,
            dataSource: this.ds.cloneWithRows(users)
    });
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
            case IDENTIFIERS.AddUser:
                this.setState({isSwitchUser: false});
                this.props.addUser(this.state.userName);
                break;
            case IDENTIFIERS.SwitchUser:
                this.setState({isSwitchUser: true});
                break;
            case IDENTIFIERS.ChangeUserName:
                this.setState({
                    userName: value
                });
                break;
            case IDENTIFIERS.switchCurrentUser:
                this.props.switchCurrentUser(value);
                this.setState({isSwitchUser: false});
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
                dataSource={this.state.dataSource}
                isSwitchUser={this.state.isSwitchUser}
                userName={this.state.userName}
            />
        );

    }
}

const mapStateToProps = (state) => {
    console.log('users', state.userReducer);
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
        users: state.userReducer.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCurrentLevel: (level) => dispatch(changeLevelDispatcher(level)),
        addUser: (name) => dispatch(addUserDispatch(name)),
        switchCurrentUser: (uuid) => dispatch(switchCurrentUserDispatch(uuid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

const IDENTIFIERS = {
    StartGame: "StartGame",
    ChangeConfig: "ChangeConfig",
    SelectStartLevel: "SelectStartLevel",
    CancelSelectLevel: "CancelSelectLevel",
    AddUser: 'AddUser',
    SwitchUser: 'SwitchUser',
    ChangeUserName: 'ChangeUserName',
    switchCurrentUser: 'switchCurrentUser'
};
