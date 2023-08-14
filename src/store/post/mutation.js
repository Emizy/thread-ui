import {
    ADD_POST,
    SET_POSTS,
    UPDATE_POST,
    DELETE_POST
} from "./types";

const setPosts = (payload) => {
    return {
        type: SET_POSTS,
        payload
    };
};
const addPost = (payload) => {
    return {
        type: ADD_POST,
        payload
    };
};

const updatePost = (payload) => {
    return {
        type: UPDATE_POST,
        payload
    };
};
const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    };
};

export {setPosts, addPost, updatePost, deletePost}