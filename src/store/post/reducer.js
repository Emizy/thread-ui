import postState from "./state";
import {
    SET_POSTS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST
} from "./types";
import {TOTAL_DISPLAY_POST} from "../../utility/constant";

export const postReducer = (state = postState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                total: action.payload.total,
                total_pages: action.payload.total_pages,
                page: action.payload.page,
            }
        case ADD_POST:
            let postsCopy = [action.payload, ...state.posts]
            if (postsCopy.length > TOTAL_DISPLAY_POST) {
                postsCopy.pop()
            }
            return {
                ...state,
                posts: postsCopy
            }
        case UPDATE_POST:
            let updatePostCopy = JSON.parse(JSON.stringify(state.posts))
            let updatePostIndex = updatePostCopy.findIndex(item => item.id === action.payload.id)
            if (updatePostIndex < 0) {
                return {
                    ...state
                }
            }
            updatePostCopy[updatePostIndex] = action.payload
            return {
                ...state,
                posts: updatePostCopy
            }
        case DELETE_POST:
            let deletePostsCopy = JSON.parse(JSON.stringify(state.posts))
            return {
                ...state, posts: deletePostsCopy.filter(item => String(item.id) !== String(action.postId))
            }
        default:
            return state
    }
}