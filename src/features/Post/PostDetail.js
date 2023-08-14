import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPost} from "../../api/Post";
import {Comments} from "./comments/Comments";
import moment from "moment";
import {SlCalender} from "react-icons/sl";
import {useSelector} from "react-redux";


export const PostDetail = () => {
    const {global} = useSelector(state => state)
    const {identifier} = useParams()
    const location = useLocation();
    const [post, setPost] = useState({})
    const fetchPost = () => {
        getPost(identifier).then(res => {
            setPost(res.data.data)
        })
    }
    useEffect(() => {
        fetchPost()
        window.scrollTo(0, 0)
        return () => {
        }
    }, [location])

    return (
        <>
            <div className={'w-full py-[30px]'}>
                <div className={'w-[50%] mx-auto'}>
                    <div className={'w-full'}>
                        <h4 className={'text-[30px] py-[10px] leading-[36px] font-[700]'}>
                            {post?.title}
                        </h4>
                    </div>
                    <div className={'w-full h-[300px]'}>
                        <img src={post?.image} alt={post?.title} className={'h-full w-full'}/>
                    </div>
                    <div className={'flex gap-3'}>
                                            <span className={'py-[10px]'}>
                                                <SlCalender className={'font-semibold text-black'}/>
                                            </span>
                        <p className={'py-[6px] font-semibold'}>
                            {moment(post?.created_at).format('MMMM Do, YYYY')}
                        </p>
                    </div>
                    <div className={'w-full'}>
                        <p className={'text-[18px] pt-[10px] pb-[40px] text-justify'}>
                            {post?.description}
                        </p>
                    </div>
                    {
                        post?.id &&
                        <div className={'w-full'}>
                            <Comments post={post} userId={global?.user?.id}/>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}