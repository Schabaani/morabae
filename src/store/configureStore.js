import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducerCombiner';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

export default function configureStore() {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware
        )
    );
    const store = createStore(reducers, enhancer);

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./reducerCombiner').default;
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}