import {ADD_USER, SWITCH_CURRENT_USER} from './actions'
import {clone} from '../../components/helpers/utilities'

const initialState = {
    uuid: undefined,
    name: undefined,
    currentUser: undefined,
    users: {},
};

export default function configReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_USER:
            let users = clone(state.users);
            users[action.uuid] = action.name;
            return {
                ...state,
                users
            };
        case SWITCH_CURRENT_USER:
            return {
                ...state,
                currentUser: action.uuid
            };
        default:
            return state;
    }
}
