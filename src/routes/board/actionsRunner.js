import {changeLevel} from './actions'

export function changeLevelDispatcher(level) {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(changeLevel(level))
    };
}