import {
    SET_CREDENTIALS,
    TOGGLE_LOGIN,
    TOGGLE_REGISTER,
    PURGE_CREDENTIALS,
    TOGGLE_POST_CREATE_MODAL,
    TOGGLE_POST_EDIT_MODAL,
    TEST_LOGIN
} from "./types";

const toggleLogin = (payload) => {
    return {
        type: TOGGLE_LOGIN,
        payload
    };
};
const toggleRegister = (payload) => {
    return {
        type: TOGGLE_REGISTER,
        payload
    };
};
const setUpAuth = (payload) => {
    return {
        type: SET_CREDENTIALS,
        payload
    }
}
const purgeAuth = () => {
    return {
        type: PURGE_CREDENTIALS
    }
}
const toggleAddPost = (payload) => {
    return {
        type: TOGGLE_POST_CREATE_MODAL,
        payload
    }
}
const toggleEditPost = (payload) => {
    return {
        type: TOGGLE_POST_EDIT_MODAL,
        payload
    }
}
const testLogin = (payload) => {
    return {
        type: TEST_LOGIN,
        payload
    }
}
export {toggleLogin, toggleRegister, setUpAuth, purgeAuth, toggleAddPost, toggleEditPost, testLogin};