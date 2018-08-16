export const CHANGE_NAME = 'CHANGE_NAME';
export const ANOTHER_REDUCER = 'ANOTHER_REDUCER';

export function changeName(text) {
    return {
        type: CHANGE_NAME,
        text
    }
}

export function changeReducer(something) {
    return {
        type: ANOTHER_REDUCER,
        something
    }
}