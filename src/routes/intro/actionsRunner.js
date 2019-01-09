import {showRealApp, showIntro} from './actions'

export function showRealAppDispatcher() {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(showRealApp())
    };
}

export function showIntroDispatcher() {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(showIntro())
    };
}