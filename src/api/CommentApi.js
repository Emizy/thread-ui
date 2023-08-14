import http from "./httpClient";
import {ENDPOINT} from "../utility/constant";

const onCreateComment = async (payload) => {
    return new Promise((resolve, reject) => {
        http.post(`${ENDPOINT.COMMENT}`, payload).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}
const onUpdateComment = async (payload) => {
    return new Promise((resolve, reject) => {
        http.put(`${ENDPOINT.COMMENT}${payload.id}`, payload.data).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}
const onListComment = async (payload) => {
    return new Promise((resolve, reject) => {
        http.get(`${ENDPOINT.COMMENT}?post__id=${payload.postId}`).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}
export {onListComment, onCreateComment}