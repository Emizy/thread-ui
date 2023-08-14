import {useState} from "react";
import {TO_CREATE_BASE_COMMENT, TO_EDIT} from "../../../store/comment/types";
import {onCreateComment} from "../../../api/CommentApi";
import useErrorFormat from "../../../utility/custom-hooks/useErrorFormat";
import {message} from 'antd';
import {useDispatch} from "react-redux";
import {updateComment} from "../../../store/comment/mutation";

export const CommentForm = ({postId, btnLabel, handleSubmit, commentId, actionType, initialText = ''}) => {
    const dispatcher = useDispatch()
    const [text, setText] = useState(initialText)
    const isTextDisabled = text.length === 0
    const [data, handleError] = useErrorFormat()
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
                dispatcher(updateComment(comment))
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
        setText('')
        setProcessing(false)
    }
    return (
        <>
            {contextHolder}
            <form onSubmit={(e) => onSubmit(e)}>
                  <textarea
                      className={'w-full min-h-[40px] border text-[15px] font-medium outline-none p-[10px] rounded-[3px]'}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                  />
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
            </form>
        </>
    )
}