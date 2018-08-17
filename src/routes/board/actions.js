export const CHANGE_LEVEL = 'CHANGE_LEVEL';

export function changeLevel(level) {
    return {
        type: CHANGE_LEVEL,
        level
    }
}

export const CHANGE_LIVES = 'CHANGE_LIVES';

export function changeLives(lives) {
    return {
        type: CHANGE_LIVES,
        lives
    }
}