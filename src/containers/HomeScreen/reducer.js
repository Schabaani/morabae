import { CHANGE_NAME } from './actions'

const initialState = {
  text: "guess!"
};

export default function homeReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                text: action.text,
            };
        default:
           return state;
    }
}
