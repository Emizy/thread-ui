import {SET_COMMENTS, SET_COMMENTS_REPLIES, UPDATE_COMMENT} from "./types";

const setComments = (payload) => {
    return {
        type: SET_COMMENTS,
        payload
    };
};
const updateComment = (payload) => {
    return {
        type: UPDATE_COMMENT,
        payload
    };
};

const setCommentsReplies = (payload) => {
    return {
        type: SET_COMMENTS_REPLIES,
        payload
    }
}
export {setComments, setCommentsReplies, updateComment}