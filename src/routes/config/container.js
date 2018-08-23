import React, {Component} from 'react';
import {connect} from 'react-redux';
import ConfigScreen from './index';
import {saveStartLevelConfigDispatcher, resetConfigDispatcher} from './actionsRunner';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'
import dismissKeyboard from "react-native-dismiss-keyboard";
import I18n from '../../components/helpers/i18n/i18n';
import {LanguageKeys} from '../../components/helpers/i18n/locales/languageKeys';

class ConfigContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            startLevel: this.props.startLevel,
        }
    }

    saveConfig = () => {
        if (!this.verifyData(this.state.startLevel)) {
            return;
        }
        dismissKeyboard();
        this.props.changeLevel(parseInt(this.state.startLevel));
        Actions.HomeScreen();
    };

    resetConfig = () => {
        this.props.resetConfig();
        Actions.HomeScreen()
    };

    verifyData = (startLevel) => {
        if (startLevel <= 0 || startLevel > 99 || !startLevel) {
            this.props.showToast(I18n.t(LanguageKeys.SetBetween1To99));
            return false;
        }
        return true;
    };

    changeDefaultLevel = (startLevel) => {
        this.setState({
            startLevel,
        })
    };

    render() {
        return (
            <ConfigScreen
                startLevel={this.state.startLevel}
                saveConfig={this.saveConfig}
                changeDefaultLevel={this.changeDefaultLevel}
                resetConfig={this.resetConfig}
            />
        );

    }
}

const mapStateToProps = (state) => {
    return {
        startLevel: state.configReducer.startLevel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLevel: (level) => dispatch(saveStartLevelConfigDispatcher(level)),
        resetConfig: () => dispatch(resetConfigDispatcher()),
    };
};

const ConfigContainerWithShowToast = ShowToastHOC(ConfigContainer);
export default connect(mapStateToProps, mapDispatchToProps)(ConfigContainerWithShowToast);
