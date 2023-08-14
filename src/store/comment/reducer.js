import commentState from "./state";
import {
    SET_COMMENTS_REPLIES,
    SET_COMMENTS,
    UPDATE_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_COMMENT_REPLY, ADD_COMMENT_REPLY
} from "./types";

export const commentReducer = (state = commentState, action) => {
    console.log("am", action)
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments,
                commentsReplies: action.payload.commentsReplies,
            }
        case SET_COMMENTS_REPLIES:
            return {
                ...state,
                commentsReplies: action.payload.commentsReplies
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        case ADD_COMMENT_REPLY:
            let commentReplyCopy = JSON.parse(JSON.stringify(state.commentsReplies))
            let parentCommentCopy = JSON.parse(JSON.stringify(state.comments))
            commentReplyCopy = [...commentReplyCopy, action.payload]
            commentReplyCopy.sort((a, b) => new Date(a?.timestamp).getTime() - new Date(b?.timestamp).getTime())
            let parentIndex = parentCommentCopy.findIndex(item => String(item.id) === String(action.payload.parent_comment_id))
            let parentReplyIndex = commentReplyCopy.findIndex(item => String(item.id) === String(action.payload.parent_comment_id))
            if (parentIndex > -1) {
                parentCommentCopy[parentIndex].total_replies += 1
            } else if (parentReplyIndex > -1) {
                commentReplyCopy[parentReplyIndex].total_replies += 1
            }

            return {
                ...state,
                comments: parentCommentCopy,
                commentsReplies: commentReplyCopy
            }
        case UPDATE_COMMENT:
            let isReply = action.payload.parent_comment_id !== null
            if (isReply === true) {
                let replyCopy = JSON.parse(JSON.stringify(state.commentsReplies))
                let replyIndex = replyCopy.findIndex(item => item.id === action.payload.id)
                if (replyIndex < -1) {
                    return {
                        ...state
                    }
                }
                replyCopy[replyIndex] = action.payload
                return {
                    ...state, commentsReplies: replyCopy
                }
            } else {
                let commentCopy = JSON.parse(JSON.stringify(state.comments))
                let commentIndex = commentCopy.findIndex(item => item.id === action.payload.id)
                if (commentIndex < -1) {
                    return {
                        ...state
                    }
                }
                commentCopy[commentIndex] = action.payload
                return {
                    ...state, comments: commentCopy
                }
            }
        case DELETE_COMMENT:
            let commentsCopy = JSON.parse(JSON.stringify(state.comments))
            return {
                ...state, comments: commentsCopy.filter(item => item.id !== action.commentId)
            }
        case DELETE_COMMENT_REPLY:
            let repliesCopy = JSON.parse(JSON.stringify(state.commentsReplies))
            return {
                ...state, commentsReplies: repliesCopy.filter(item => item.id !== action.commentId)
            }
        default:
            return state
    }
}