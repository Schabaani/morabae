import {SHOW_INTRO, SHOW_REAL_APP} from './actions'

const initialState = {
    showRealApp: false
};

export default function introReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_REAL_APP:
            return {
                ...state,
                showRealApp: true
            };
        case SHOW_INTRO:
            return {
                ...state,
                showRealApp: false
            };
        default:
            return state;
    }
}
