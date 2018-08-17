import {changeLevel, changeLives} from './actions'

export function changeLevelDispatcher(level) {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(changeLevel(level))
    };
}

export function changeLivesDispatcher(lives) {
    return (dispatch) => {
        if(lives === 0){
            dispatch(changeLevel(1))
        }
        dispatch(changeLives(lives))
    };
}