import { CHANGE_NAME } from './actions'

const initialState = {
  text: "guess!",
  gameCells: [],
  gameLevel: 1
};

export default function boardReducer(state = initialState, action = {}) {
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
