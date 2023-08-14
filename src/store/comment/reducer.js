import commentState from "./state";
import {SET_COMMENTS_REPLIES, SET_COMMENTS, UPDATE_COMMENT} from "./types";

export const commentReducer = (state = commentState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments
            }
        case SET_COMMENTS_REPLIES:
            return {
                ...state,
                commentsReplies: action.payload.replies
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        default:
            return state
    }
}