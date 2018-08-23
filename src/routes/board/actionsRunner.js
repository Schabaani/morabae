import {changeLevel, changeLives} from './actions'
import {saveCompletedLevelConfig} from '../config/actions'

export function changeLevelDispatcher(level) {
    // We return a function instead of an action object
    return (dispatch, getState) => {
        const mode = getState().configReducer.mode;
        if(!mode){
            let completedLevel = getState().boardReducer.completedLevel
            if(completedLevel < level){
                completedLevel = level
            }
            dispatch(changeLevel(level, completedLevel))
        } else {
            let completedLevel = getState().configReducer.completedLevel
            if(completedLevel < level){
                completedLevel = level
            }
            dispatch(saveCompletedLevelConfig(level, completedLevel))
        }
        
    };
}

export function changeLivesDispatcher(lives) {
    return (dispatch) => {
        if(lives === 0){
            dispatch(changeLevel(1,1))
        }
        dispatch(changeLives(lives))
    };
}