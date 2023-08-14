import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CommentForm} from "./CommentForm";
import {message, Popconfirm} from "antd";
import {onDeleteComment} from "../../../api/CommentApi";
import useErrorFormat from "../../../utility/custom-hooks/useErrorFormat";
import {deleteComment, deleteCommentReply} from "../../../store/comment/mutation";


export const Comment = ({comment, userId}) => {
    const [data, handleError] = useErrorFormat()
    const dispatcher = useDispatch()
    const commentData = useSelector(state => state.commentData)
    const replies = commentData?.commentsReplies?.filter(item => String(item.parent_comment_id) === String(comment?.id))
    const [messageApi, contextHolder] = message.useMessage();
    const canEdit = userId === comment.user_id
    const canDelete = userId === comment.user_id
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const handleClose = () => {
        setIsEditing(false)
    }
    const handleReplyClose = () => {
        setIsReplying(false)
    }
    const handleDelete = () => {
        console.log('commentId', comment?.id)
        const isReply = comment?.parent_comment_id !== null
        onDeleteComment(comment.id).then(() => {
            if (isReply) {
                dispatcher(deleteCommentReply(comment.id))
            } else {
                dispatcher(deleteComment(comment.id))
            }
        }).catch(err => {
            handleError(err)
            setTimeout(() => {
                messageApi.open({
                    type: 'error',
                    content: data,
                    duration: 10,
                });
            }, 120)
        })

    }

    return (
        <>
            {contextHolder}
            <div className={'w-full py-[10px]'}>
                <div className={'flex'}>
                    <div className={'w-[10%]'}>
                        <div className={'w-10 h-10 bg-gray-300 rounded-full'}/>
                    </div>
                    <div className={'w-[90%]'}>
                        <div className={'flex gap-3'}>
                            {isEditing === false &&
                            <p className={'w-[80%] text-justify'}>
                                {comment.body}
                            </p>
                            }
                            {
                                isEditing === true &&
                                <div className={'w-[80%]'}>
                                    <CommentForm
                                        key={`comment-form-${comment?.id}`}
                                        btnLabel={'Update'}
                                        postId={comment?.post_id}
                                        commentId={comment?.id}
                                        initialText={comment?.body}
                                        handleClose={handleClose}
                                        parentCommentId={comment?.parent_comment_id}
                                        actionType={'update_comment'}
                                    />
                                </div>
                            }
                            <p className={'w-[20%]'}>
                                {new Date(comment.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                        <div className={'w-full flex divide-x gap-4 py-[15px]'} data-testid={'comment-action'}>
                            <div className={'pr-[5px]'}>
                                <ul className={'flex gap-3 text-[12px] font-medium'}>
                                    <li>
                                        <span className={'cursor-pointer'}
                                              onClick={() => setIsReplying(true)}>Reply</span>
                                    </li>
                                    {
                                        comment.total_replies > 0 &&
                                        <li>
                                            <div className={'w-1 h-1 mt-[6px] rounded-full bg-gray-300'}/>
                                        </li>
                                    }
                                    {
                                        comment.total_replies > 0 &&
                                        <li>
                                            {comment.total_replies} {comment.total_replies > 1 ? 'Replies' : 'Reply'}
                                        </li>
                                    }

                                </ul>
                            </div>
                            {
                                canEdit === true && isEditing === false &&
                                <div className={'pl-[10px]'}>
                                    <ul className={'flex gap-3 text-[12px] font-medium'}>
                                        <li>
                                            <span className={'cursor-pointer'}
                                                  data-testid={`comment-edit-${comment.id}`}
                                                  onClick={() => setIsEditing(true)}>Edit</span>
                                        </li>
                                    </ul>
                                </div>
                            }
                            {canDelete === true &&
                            <div className={'pl-[10px]'}>
                                <ul className={'flex gap-3 text-[12px] font-medium'}>
                                    <li>
                                        <Popconfirm
                                            title="Delete the comment"
                                            description="Are you sure to delete this comment?"
                                            onConfirm={handleDelete}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                        <span className={'cursor-pointer text-red-500'}
                                              data-testid={`comment-delete-${comment.id}`}>Delete</span>
                                        </Popconfirm>
                                    </li>
                                </ul>
                            </div>
                            }

                        </div>
                        <div className={'w-full py-[10px] divide-y'}>
                            {
                                replies.map(reply => {
                                    return <Comment
                                        comment={reply}
                                        key={reply.id}
                                        userId={userId}
                                    />
                                })
                            }
                        </div>
                        {isReplying === true &&
                        <div className={'w-full'}>
                            <CommentForm
                                postId={comment?.post_id}
                                btnLabel={'Reply'}
                                commentId={comment?.id}
                                parentCommentId={comment?.id}
                                actionType={'create_reply'}
                                handleClose={handleReplyClose}
                            />
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}