import {CHANGE_LEVEL, CHANGE_LIVES} from './actions'
import {clone} from "../../components/helpers/utilities";

const initialState = {
    // level: 1,
    currentLevel: 1,
    completedLevel: 1,
    lives: 0,
    scores: {}
    // scores: {
    //     uuid:{
    //         completedLevel: 0,
    //         currentLevel: 0,
    //         lives: 0,
    //         reachedLevel: {20: [60,90], 60:[5]} //
    //     }
    // }
};

export default function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_LEVEL:
            let scores = clone(state.scores);
            if(scores[action.uuid] === undefined){
                const reachedLevel = action.level;
                 reachedLevel[action.level] = [67];
                scores[action.uuid] = {
                    completedLevel: action.completedLevel,
                    currentLevel: action.level,
                    reachedLevel
                }
            } else {
                if(scores[action.uuid].reachedLevel[action.level] === undefined){
                    const reachedLevel = action.level;
                    reachedLevel[action.level] = [67];
                    scores[action.uuid] = {
                        completedLevel: action.completedLevel,
                        currentLevel: action.level,
                        reachedLevel
                    }
                } else {
                    // const reachedLevel = action.level;
                    scores[action.uuid].reachedLevel[action.level].push(89);
                    scores[action.uuid] = {
                        completedLevel: action.completedLevel,
                        currentLevel: action.level,
                        // reachedLevel
                    }

                }
            }
            return {
                ...state,
                // level: action.level,
                scores,
                currentLevel: action.level,
                completedLevel: action.completedLevel,
            };
        case CHANGE_LIVES:
            return {
                ...state,
                lives: action.lives
            };
        default:
            return state;
    }
}
