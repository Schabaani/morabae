import React, {Component} from 'react';
import {connect} from 'react-redux';
import ConfigScreen from './index';
import {saveStartLevelConfigDispatcher, resetConfigDispatcher} from './actionsRunner';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'

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
        if(!this.verifyData(this.state.startLevel)){
            return;
        }
        this.props.changeLevel(parseInt(this.state.startLevel));
        Actions.HomeScreen();
    };

    resetConfig = () => {
        this.props.resetConfig();
        Actions.HomeScreen()
    };

    verifyData =(startLevel) =>{
        if(startLevel <=0 || startLevel > 99 || !startLevel){
            this.props.showToast('Please set level between 1 to 99');
            return false;
        }
        return true;
    };

    changeDefaultLevel =(startLevel)=>{
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

/*
map state to props
state is your redux-store object
*/
const mapStateToProps = (state) => {
    return {
        startLevel: state.configReducer.startLevel,
    };
};


/*
connect dispatch to props so that you can call the methods from the active props scope.
The defined method `addTodo` can be called in the scope of the components props.
*/
const mapDispatchToProps = (dispatch) => {
    return {
        changeLevel: (level) => dispatch(saveStartLevelConfigDispatcher(level)),
        resetConfig: () => dispatch(resetConfigDispatcher()),
    };
};

const ConfigContainerWithShowToast = ShowToastHOC(ConfigContainer);
/* clean way of setting up the connect. */
export default connect(mapStateToProps, mapDispatchToProps)(ConfigContainerWithShowToast);
