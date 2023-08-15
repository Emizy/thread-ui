import appState from "./state";
import {setToken, removeToken} from "../utility/services-jwt";
import {
    PURGE_CREDENTIALS,
    SET_CREDENTIALS,
    TOGGLE_LOGIN,
    TOGGLE_REGISTER,
    TOGGLE_POST_CREATE_MODAL,
    TOGGLE_POST_EDIT_MODAL, TEST_LOGIN
} from "./types";

export const reducer = (state = appState, action) => {
    switch (action.type) {
        case PURGE_CREDENTIALS:
            removeToken()
            return {
                ...state,
                isAuthenticated: 'notLoggedIn',
                token: {},
                user: {}
            }
        case SET_CREDENTIALS:
            setToken(action.payload.token.access)
            return {
                ...state,
                isAuthenticated: 'LoggedIn',
                token: action.payload.token,
                user: action.payload.data
            }
        case TEST_LOGIN:
            return {
                ...state, ...action.payload
            }
        case TOGGLE_LOGIN:
            return {
                ...state, isRegisterModal: 'close', isLoginModal: action.payload.status
            }
        case TOGGLE_REGISTER:
            return {
                ...state, isLoginModal: 'close', isRegisterModal: action.payload.status
            }
        case TOGGLE_POST_CREATE_MODAL:
            return {
                ...state, isAddPostModal: action.payload.status
            }
        case TOGGLE_POST_EDIT_MODAL:
            return {
                ...state, isEditPostModal: action.payload.status
            }
        default:
            return state
    }
}