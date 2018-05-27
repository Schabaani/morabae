export const CHANGE_NAME = 'CHANGE_NAME';

export function changeName(text) {
    return {
        type: CHANGE_NAME,
        text
    }
}