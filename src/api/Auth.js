import http from "./httpClient";
import {ENDPOINT} from "../utility/constant";

const onLogin = async (payload) => {
    return new Promise((resolve, reject) => {
        http.post(ENDPOINT.LOGIN, payload).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
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