import http from "./httpClient";
import {ENDPOINT} from "../utility/constant";

const onLogin = async () => {
    return new Promise((resolve, reject) => {

    });
}

const onRegister = async (payload) => {
    return new Promise((resolve, reject) => {
        http.post(ENDPOINT.REGISTER, payload).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}

export {onRegister, onLogin}