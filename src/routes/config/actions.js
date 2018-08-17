export const SAVE_START_LEVEL_CONFIG = 'SAVE_START_LEVEL_CONFIG';

export function saveStartLevelConfig(startLevel) {
    return {
        type: SAVE_START_LEVEL_CONFIG,
        startLevel
    }
}
