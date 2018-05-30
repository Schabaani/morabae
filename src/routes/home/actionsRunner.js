import {changeName} from './actions'

export function changeNameAfter5Seconds(text) {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(changeName(text));
        }, 1000);
    };
}