import http from "../api/httpClient";
import {ENDPOINT} from "../utility/constant";

const onLogin = () => {
    return new Promise((resolve, reject) => {
        console.log("am here for mockers 22")
        // console.log("am here for mocker",http.post.mockResolvedValue())
        http.post(ENDPOINT.LOGIN, payload).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    });
}