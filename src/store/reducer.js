import appState from "./state";
import {SET_CREDENTIALS} from "./types";

export const reducer = (state = appState, action) => {
    switch (action.type) {
        case SET_CREDENTIALS:
            return {
                ...state
            }
        default:
            return state
    }
}