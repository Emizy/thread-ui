import appState from "./state";
import {SET_CREDENTIALS, TOGGLE_LOGIN, TOGGLE_REGISTER} from "./types";

export const reducer = (state = appState, action) => {
    switch (action.type) {
        case SET_CREDENTIALS:
            return {
                ...state
            }
        case TOGGLE_LOGIN:
            return {
                ...state, isRegisterModal: 'close', isLoginModal: action.payload.status
            }
        case TOGGLE_REGISTER:
            return {
                ...state, isLoginModal: 'close', isRegisterModal: action.payload.status
            }
        default:
            return state
    }
}