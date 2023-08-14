import {
    ADD_COMMENT, ADD_COMMENT_REPLY,
    DELETE_COMMENT,
    DELETE_COMMENT_REPLY,
    SET_COMMENTS,
    SET_COMMENTS_REPLIES,
    UPDATE_COMMENT
} from "./types";

const setComments = (payload) => {
    return {
        type: SET_COMMENTS,
        payload
    };
};
const addComment = (payload) => {
    return {
        type: ADD_COMMENT,
        payload
    };
};
const addCommentReply = (payload) => {
    return {
        type: ADD_COMMENT_REPLY,
        payload
    };
};
const updateComment = (payload) => {
    return {
        type: UPDATE_COMMENT,
        payload
    };
};
const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    };
};
const deleteCommentReply = (commentId) => {
    return {
        type: DELETE_COMMENT_REPLY,
        commentId
    };
};

const setCommentsReplies = (payload) => {
    return {
        type: SET_COMMENTS_REPLIES,
        payload
    }
}
export {setComments, setCommentsReplies, updateComment, addComment, deleteComment, deleteCommentReply, addCommentReply}