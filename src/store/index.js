import { persistStore, persistCombineReducers } from 'redux-persist'
import {createStore} from "redux";
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native
import reducers from './reducerCombiner' // where reducers is an object of reducers

const config = {
    key: 'root5',
    storage,
};

const reducer = persistCombineReducers(config, reducers);

function configureStore () {
    // ...
    let store = createStore(reducer);
    let persistor = persistStore(store);

    return { persistor, store }
}

export default configureStore;