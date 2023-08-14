import {CommentForm} from "./CommentForm";
import {useEffect} from "react";
import {onListComment} from "../../../api/CommentApi";
import {useSelector, useDispatch} from "react-redux";
import {setComments} from "../../../store/comment/mutation";
import {Comment} from "./Comment";
import {EmptyComponent} from "../../../components/EmptyComponent";

export const Comments = ({post, userId}) => {
    const dispatcher = useDispatch()
    const commentData = useSelector(state => state.commentData)
    const fetchComment = () => {
        onListComment({postId: post?.id}).then(resp => {
            let comment_replies = resp.data.data.results.filter(item => item.parent_comment_id !== null)
            comment_replies.sort((a, b) =>
                new Date(a?.timestamp).getTime() - new Date(b?.timestamp).getTime())
            dispatcher(setComments({
                comments: resp.data.data.results.filter(item => item.parent_comment_id === null),
                commentsReplies: comment_replies
            }))
        })
    }
    useEffect(() => {
        if (post?.id) {
            fetchComment()
        }

    }, [post])
    return (
        <>
            <div className={'w-full py-[10px] mb-[80px]'}>
                <h3 className={'text-[20px] font-semibold my-[10px]'} data-testid={'comment-header'}>Comments </h3>
                <CommentForm btnLabel={'Post'}
                             postId={post?.id}
                             actionType={'create_base_comment'}
                />
                <hr className={'my-[20px]'}/>
                <div className={'grid grid-cols-1 gap-6 w-full divide-y my[20px]'} data-testid={'comments'}>
                    {
                        commentData?.comments?.length > 0 &&
                        commentData?.comments?.map(comment => {
                            return <Comment
                                key={comment.id}
                                comment={comment}
                                userId={userId}
                            />
                        })
                    }

                </div>
                {commentData?.comments?.length === 0 &&
                <div className={'w-full'}>
                    <div className={'w-[50%] mx-auto'}>
                        <EmptyComponent text={'No comments available'}/>

                    </div>
                </div>
                }


            </div>
        </>
    )
}