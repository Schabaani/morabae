export const CHANGE_LEVEL = 'CHANGE_LEVEL';

export function changeLevel(level) {
    return {
        type: CHANGE_LEVEL,
        level
    }
}