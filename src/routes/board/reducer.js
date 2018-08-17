import {CHANGE_LEVEL } from './actions'

const initialState = {
    level: 1
};

export default function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_LEVEL:
            return {
                ...state,
                level: action.level,
            };
        default:
           return state;
    }
}
