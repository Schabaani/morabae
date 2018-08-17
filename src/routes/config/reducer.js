import {SAVE_START_LEVEL_CONFIG } from './actions'

const initialState = {
    startLevel: 1
};

export default function configReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_START_LEVEL_CONFIG:
            return {
                ...state,
                level: action.startLevel,
            };  
        default:
           return state;
    }
}
