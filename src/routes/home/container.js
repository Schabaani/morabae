import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeScreen from './index';
import {Actions} from 'react-native-router-flux';

class HomeContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.startLevel= this.props.startLevel;
    }
    // saveConfig = ()=>{
    //     if(!this.verifyData(this.startLevel)){
    //         return;
    //     }
    // }

    // resetConfig = ()=>{
        
    // };

    // verifyData =(startLevel) =>{
    //     if(startLevel <=0 || startLevel > 99){
    //         this.props.showToast('Please set level between 1 to 99');
    //         return false;
    //     }
    //     return true;
    // }

    // changeDefaultLevel =(startLevel)=>{
    //     this.startLevel = startLevel;
    // }

    onRunCommand = (value)=>{
        switch(value){
            case IDENTIFIERS.ChangeConfig:
                Actions.ConfigScreen();
                break;
            case IDENTIFIERS.StartGame:
                Actions.BoardScreen();
                break;
        }

    };


    render() {
        return (
            <HomeScreen
                identifiers={IDENTIFIERS}
                onRunCommand={this.onRunCommand}
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
    };
};

/* clean way of setting up the connect. */
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

const IDENTIFIERS = {
    StartGame: "StartGame",
    ChangeConfig: "ChangeConfig"
};
