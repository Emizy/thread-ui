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
export {onCreatePost}