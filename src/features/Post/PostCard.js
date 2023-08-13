import image from "../../assets/images/idea.jpg"
import {SlCalender} from "react-icons/sl";
import {FaRegCommentAlt} from "react-icons/fa";

export const PostCard = () => {
    return (
        <>
            <div className={'h-[500px]'}>
                <div className={'h-[250px] w-full'}>
                    <img src={image} alt={'Blog post'} className={'h-[250px] w-full'}/>
                </div>
                <div className={'w-full py-[10px]'}>
                    <div className={'w-full'}>
                        <h4 className={'font-semibold text-[24px]'}>
                            Best Digital Marketing Strategies You should be using
                        </h4>
                    </div>
                    <div className={'w-full'}>
                        <p className={'font-normal py-[10px] text-[15px]'}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type and scrambled it to
                            make a type specimen book.
                        </p>
                    </div>
                    <hr/>
                    <div className={'flex justify-between'}>
                        <div className={'flex gap-3'}>
                                            <span className={'py-[10px]'}>
                                                <SlCalender/>
                                            </span>
                            <p className={'py-[6px]'}>
                                15-11-2022
                            </p>
                        </div>
                        <div className={'flex gap-3'}>
                                            <span className={'py-[10px]'}>
                                                <FaRegCommentAlt/>
                                            </span>
                            <p className={'py-[6px]'}>
                                Comments (4)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}