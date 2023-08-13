import {SlCalender} from "react-icons/sl";
import {FaRegCommentAlt} from "react-icons/fa";
import {truncate} from "../../utility/utils";
import moment from "moment";

export const PostCard = ({post, title_count = 23, caption_count = 160}) => {
    return (
        <>
            <div className={'h-[500px]'}>
                <div className={'h-[250px] w-full'}>
                    <img src={post?.image} alt={'Blog post'} className={'h-[250px] w-full'}/>
                </div>
                <div className={'w-full py-[10px]'}>
                    <div className={'w-full h-full lg:h-[72px]'}>
                        <h4 className={'font-semibold text-[24px]'}>
                            {truncate(post?.title, title_count, '...')}
                        </h4>
                    </div>
                    <div className={'w-full h-[132px]'}>
                        <p className={'font-normal py-[10px] text-[15px]'}>
                            {truncate(post?.description, caption_count, '...')} <span
                            className={'text-[#007bff] text-italic cursor-pointer'}>Read More</span>
                        </p>
                    </div>
                    <hr/>
                    <div className={'flex justify-between'}>
                        <div className={'flex gap-3'}>
                                            <span className={'py-[10px]'}>
                                                <SlCalender/>
                                            </span>
                            <p className={'py-[6px]'}>
                                {moment(post?.created_at).format('DD-MM-YYYY')}
                            </p>
                        </div>
                        <div className={'flex gap-3'}>
                                            <span className={'py-[10px]'}>
                                                <FaRegCommentAlt/>
                                            </span>
                            <p className={'py-[6px]'}>
                                Comment{post?.total_comments > 1 ? 's' : ''} ({post?.total_comments})
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}