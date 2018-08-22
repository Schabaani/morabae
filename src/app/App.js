import React, {Component} from 'react';
import {Router, Scene} from "react-native-router-flux";
import {connect, Provider} from 'react-redux';
import configureStore from '../store/index';
import {PersistGate} from "redux-persist/lib/integration/react";
import HomeContainer from '../routes/home/container';
import BoardContainer from '../routes/board/container';
import ConfigContainer from '../routes/config/container';
import {View} from 'react-native';


const {persistor, store} = configureStore();
const RouterWithRedux = connect()(Router);


const onBeforeLift = () => {
    // take some action before the gate lifts
};


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<View style={{width: '100%', height: '100%', backgroundColor: 'cyan'}}/>}
                    onBeforeLift={onBeforeLift}
                    persistor={persistor}>
                    <RouterWithRedux>
                        <Scene>
                            <Scene
                                key="HomeScreen"
                                component={HomeContainer}
                                initial
                            />
                            <Scene
                                key="BoardScreen"
                                component={BoardContainer}
                            />
                            <Scene
                                key="ConfigScreen"
                                component={ConfigContainer}
                            />
                        </Scene>
                    </RouterWithRedux>
                </PersistGate>
            </Provider>

        )
    }
}

