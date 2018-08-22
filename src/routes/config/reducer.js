import {SAVE_START_LEVEL_CONFIG, RESET_DEFAULT_MODE, SAVE_COMPLETED_LEVEL} from './actions'

const initialState = {
    startLevel: undefined,
    completedLevel: 1,
    mode: undefined,
};

export default function configReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_START_LEVEL_CONFIG:
            return {
                ...state,
                startLevel: action.startLevel,
                mode: 'test',
                currentLevel: action.startLevel,
                completedLevel: action.startLevel
            }; 
        case RESET_DEFAULT_MODE:
            return {
                ...state,
                mode: undefined,
                startLevel: undefined,
                completedLevel: 1
            }
        case SAVE_COMPLETED_LEVEL:
            return {
                ...state,
                completedLevel: action.completedLevel,
                currentLevel: action.currentLevel
            }      
        default:
           return state;
    }
}
