import {TOGGLE_LOGIN, TOGGLE_REGISTER} from "./types";

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


export {toggleLogin,toggleRegister};