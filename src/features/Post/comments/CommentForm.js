import {useEffect, useState} from "react";
import {TO_CREATE_BASE_COMMENT, TO_EDIT, TO_CREATE_REPLY} from "../../../store/comment/types";
import {onCreateComment, onUpdateComment} from "../../../api/CommentApi";
import useErrorFormat from "../../../utility/custom-hooks/useErrorFormat";
import {message} from 'antd';
import {useDispatch} from "react-redux";
import {updateComment, addComment, addCommentReply} from "../../../store/comment/mutation";

export const CommentForm = ({
                                postId,
                                btnLabel,
                                commentId,
                                parentCommentId,
                                actionType,
                                initialText = '',
                                handleClose
                            }) => {
    const dispatcher = useDispatch()
    const [text, setText] = useState(initialText)
    const isTextDisabled = text.length === 0
    const [data, handleError] = useErrorFormat('')
    const [messageApi, contextHolder] = message.useMessage();
    const [processing, setProcessing] = useState(false)
    const onSubmit = e => {
        e.preventDefault()
        setProcessing(true)
        let payload = {
            "post_id": postId,
            "body": text
        }
        if (actionType === TO_CREATE_BASE_COMMENT) {
            onCreateComment(payload).then(resp => {
                let comment = {...resp.data.data, open: false}
                dispatcher(addComment(comment))
            }).catch(err => {
                handleError(err)
            })
            setText('')
        } else if (actionType === TO_EDIT) {
            if (parentCommentId) {
                payload['parent_comment_id'] = parentCommentId
            }
            onUpdateComment({
                data: payload,
                id: commentId
            }).then(resp => {
                let comment = {...resp.data.data, open: false}
                dispatcher(updateComment(comment))
                handleClose()
            }).catch(err => {
                handleError(err)
            })
        } else if (actionType === TO_CREATE_REPLY) {
            if (!parentCommentId) {
                messageApi.open({
                    type: 'error',
                    content: 'Your reply could not be submitted,Try again',
                    duration: 10
                })
                return false
            }
            payload['parent_comment_id'] = parentCommentId
            onCreateComment(payload).then(resp => {
                let comment = {...resp.data.data, open: false}
                dispatcher(addCommentReply(comment))
                handleClose()
            }).catch(err => {
                handleError(err)
            })
            setText('')
        }
        setProcessing(false)
    }
    useEffect(() => {
        if (data !== '' && data?.length > 0) {
            messageApi.open({
                type: 'error',
                content: data,
                duration: 10,
            });
            handleError('')
        }
    }, [data])
    return (
        <>
            {contextHolder}
            <form onSubmit={(e) => onSubmit(e)}>
                  <textarea autoFocus={true}
                      className={'w-full min-h-[40px] border text-[15px] font-medium outline-none p-[10px] rounded-[3px]'}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                  />
                <div className={'flex gap-3'}>
                    <button disabled={isTextDisabled | processing}
                            className={'py-[5px] text-[13px] rounded-[2px] font-medium px-[15px] flex justify-center text-white bg-[#0371E0]'}>
                        {processing === false && btnLabel}
                        {processing === true &&
                        <p className={'flex justify-center'}>
                            <svg className="animate-spin -ml-1  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                        </p>
                        }
                    </button>
                    {
                        commentId &&
                        <button disabled={processing} type={'button'} onClick={() => handleClose()}
                                className={'py-[5px] text-[13px] rounded-[2px] font-medium px-[15px] flex justify-center text-white bg-red-500'}>
                            Close
                        </button>
                    }
                </div>
            </form>
        </>
    )
}