const uuidV4 = require('uuid/v4');

export const ADD_USER = 'ADD_USER';
export function addUser(name) {
    return {
        type: ADD_USER,
        name,
        uuid: uuidV4(),
    }
}

export const SWITCH_CURRENT_USER = 'SWITCH_CURRENT_USER';
export function switchCurrentUser(uuid) {
    return {
        type: SWITCH_CURRENT_USER,
        uuid
    }
}