import { persistStore, persistCombineReducers } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native
import reducers from './reducerCombiner' // where reducers is an object of reducers

const config = {
    key: 'tradecore',
    storage,
};

const reducer = persistCombineReducers(config, reducers);

function configureStore () {
    // ...
    let middleWare = applyMiddleware(thunk);
    let store = createStore(reducer, middleWare);
    let persistor = persistStore(store);

    return { persistor, store}
}

export default configureStore;