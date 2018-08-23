import {CHANGE_LEVEL, CHANGE_LIVES} from './actions'

const initialState = {
    // level: 1,
    currentLevel: 1,
    completedLevel: 1,
    lives: 0
};

export default function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_LEVEL:
            return {
                ...state,
                // level: action.level,
                currentLevel: action.level,
                completedLevel: action.completedLevel,
            };
        case CHANGE_LIVES:
            return {
                ...state,
                lives: action.lives
            };
        default:
            return state;
    }
}
