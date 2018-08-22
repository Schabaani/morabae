export const SAVE_START_LEVEL_CONFIG = 'SAVE_START_LEVEL_CONFIG';

export function saveStartLevelConfig(startLevel) {
    return {
        type: SAVE_START_LEVEL_CONFIG,
        startLevel
    }
}

export const RESET_DEFAULT_MODE = 'RESET_DEFAULT_MODE';
export function resetDefaultConfig() {
    return {
        type: RESET_DEFAULT_MODE
    }
}

export const SAVE_COMPLETED_LEVEL = 'SAVE_COMPLETED_LEVEL';
export function saveCompletedLevelConfig(currentLevel, completedLevel) {
    return {
        type: SAVE_COMPLETED_LEVEL,
        currentLevel,
        completedLevel
    }
}