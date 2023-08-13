import http from "./httpClient";
import {ENDPOINT} from "../utility/constant";

const onCreatePost = async (payload) => {
    return new Promise((resolve, reject) => {
        http.post(ENDPOINT.POST, payload, {headers: {'Content-Type': 'multipart/form-data'}}).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}
const onListPost = async (payload) => {
    return new Promise((resolve, reject) => {
        http.get(`${ENDPOINT.POST}${payload.data}`).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}
export {onCreatePost, onListPost}