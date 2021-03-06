import {saveStartLevelConfig, resetDefaultConfig} from './actions'

export function saveStartLevelConfigDispatcher(startLevel) {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(saveStartLevelConfig(startLevel))
    };
}

export function resetConfigDispatcher() {
    // We return a function instead of an action object
    return (dispatch) => {
        dispatch(resetDefaultConfig())
    };
}