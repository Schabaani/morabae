import {addUser, switchCurrentUser} from './actions'

export function addUserDispatch(name) {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(addUser(name))
    };
}

export function switchCurrentUserDispatch(uuid) {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(switchCurrentUser(uuid))
    };
}