import {SlCalender} from "react-icons/sl";
import {truncate} from "../../utility/utils";
import moment from "moment";
import {Popconfirm} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LOGGEDIN} from "../../store/types";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {deletePost} from "../../store/post/mutation";
import {deletePostApi} from "../../api/Post";
import useErrorFormat from "../../utility/custom-hooks/useErrorFormat";
import {useEffect} from "react";

export const PostCard = ({post, title_count = 23, caption_count = 160, onMessage, handleEdit, onDelete}) => {
    const global = useSelector(state => state.global)
    const dispatcher = useDispatch()
    const [data, handleError] = useErrorFormat('')
    const canAction = global.isAuthenticated === LOGGEDIN && post?.user?.id === global?.user.id
    const navigate = useNavigate()
    const goTo = (url) => {
        navigate(url)
    }
    const handleDelete = () => {
        deletePostApi(post?.id).then(() => {
            dispatcher(deletePost(post?.id))
            onDelete(`reload-${new Date().getTime()}`)
        }).catch(err => {
            handleError(err)
        })
    }
    const onEdit = () => {
        handleEdit(post)
    }
    useEffect(() => {
        if (data !== '' && data?.length > 0) {
            onMessage({
                type: 'error',
                message: data,
            });
            handleError('')
        }
    }, [data])
    return (
        <>
            <div className={'h-[500px]'} data-testid={'post-item'}>
                <div className={'h-[250px] w-full'}>
                    <img src={post?.image} alt={'Blog post'} className={'h-[250px] w-full'}/>
                </div>
                <div className={'w-full py-[10px]'}>
                    <div className={'w-full h-full lg:h-[72px]'}>
                        <h4 className={'font-semibold text-[24px]'} data-testid={'post-title'}>
                            {truncate(post?.title, title_count, '...')}
                        </h4>
                    </div>
                    <div className={'w-full h-[132px]'}>
                        <p className={'font-normal py-[10px] text-[15px]'} data-testid={'post-description'}>
                            {truncate(post?.description, caption_count, '...')} <span
                            className={'text-[#007bff] text-italic cursor-pointer'}
                            onClick={() => goTo(`/blog/${post?.id}/${post?.slug}`)}>Read More</span>
                        </p>
                    </div>
                    <hr/>
                    <div className={'flex justify-between'}>
                        <div className={'flex gap-3'}>
                                            <span className={'py-[10px]'}>
                                                <SlCalender/>
                                            </span>
                            <p className={'py-[6px]'} data-testid={'post-date'}>
                                {moment(post?.created_at).format('DD-MM-YYYY')}
                            </p>
                        </div>
                        {canAction === true &&
                        <div className={'flex gap-3 py-[10px]'} data-testid={'post-actions'}>
                            <ul className={'flex gap-3'}>
                                <li className={'pr-[5px]'}>
                                    <span className={'cursor-pointer'} onClick={() => onEdit()}
                                          data-testid={'post-edit-btn'}>
                                        <AiOutlineEdit className={'text-[#0371E0]'}/>
                                    </span>
                                </li>
                                <li className={'pr-[5px]'}>
                                    <Popconfirm
                                        title="Delete the post"
                                        description="Are you sure to delete this post?"
                                        onConfirm={handleDelete}
                                        okText="Yes"
                                        data-testid={'post-delete-confirm-btn'}
                                        cancelText="No"
                                    >
                                        <div className={'cursor-pointer'}>
                                            <AiOutlineDelete className={'text-red-500'}/>
                                        </div>
                                    </Popconfirm>
                                </li>
                            </ul>
                        </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}