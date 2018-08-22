export const CHANGE_LEVEL = 'CHANGE_LEVEL';

export function changeLevel(level, completedLevel) {
    return {
        type: CHANGE_LEVEL,
        level,
        completedLevel
    }
}

export const CHANGE_LIVES = 'CHANGE_LIVES';

export function changeLives(lives) {
    return {
        type: CHANGE_LIVES,
        lives
    }
}