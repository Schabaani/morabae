import { ANOTHER_REDUCER } from './actions'

const initialState = {
    anotherReducer: "another reducer",
};

export default function anotherReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ANOTHER_REDUCER:
            return {
                ...state,
                something: action.something,
            };
        default:
            return state;
    }
}