import React, {Component} from 'react';
import {Router, Scene} from "react-native-router-flux";
import {connect, Provider} from 'react-redux';
import configureStore from '../store/index';
import {PersistGate} from "redux-persist/lib/integration/react";
import HomeContainer from '../routes/home/container';
import BoardContainer from '../routes/board/container';
import ConfigContainer from '../routes/config/container';
import HowPlayScreen from '../routes/howPlay/container';
import IntroScreen from '../routes/intro/container';
import {View} from 'react-native';
import {COLOR} from "../components/helpers/colorPalette";

if (__DEV__) {
    import('../dev').then(() => console.log('Reactotron Configured'))
}

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
                    loading={<View style={{width: '100%', height: '100%', backgroundColor: COLOR.BACK_GROUND_COLOR}}/>}
                    onBeforeLift={onBeforeLift}
                    persistor={persistor}>
                    <RouterWithRedux>
                        <Scene>
                            <Scene
                                key="HomeScreen"
                                component={HomeContainer}

                            />
                            <Scene
                                key="BoardScreen"
                                component={BoardContainer}
                            />
                            <Scene
                                key="ConfigScreen"
                                component={ConfigContainer}
                            />
                            <Scene
                                key="HowPlayScreen"
                                component={HowPlayScreen}
                            />
                            <Scene
                                key="IntroScreen"
                                component={IntroScreen}
                                initial
                            />

                        </Scene>
                    </RouterWithRedux>
                </PersistGate>
            </Provider>

        )
    }
}
