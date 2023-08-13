import {PostFilterTab} from "./PostFilterTab";
import {PostCard} from "./PostCard";
import {PostCardShimmer} from "./PostCardShimmer";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {toggleAddPost} from "../../store/mutation";
import {Drawer, message} from 'antd';
import {AddPost} from "./AddPost";

export const Post = () => {
    const {global} = useSelector(state => state)
    const dispatcher = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false)
    const onFilter = (tab) => {
        console.log(tab)
    }
    const onSearch = (search) => {
        console.log(search)
    }
    const onMessage = (data) => {
        messageApi.open({
            type: data.type,
            content: data.message,
            duration: 10,
        });
    };
    const onClose = () => {
        dispatcher(toggleAddPost({
            status: 'close'
        }))
    }
    return (
        <>
            {contextHolder}
            <div className={'w-full py-[30px]'}>
                <div className={'w-[86%] mx-auto'}>
                    <div className={'w-[60%] mx-auto'}>
                        <PostFilterTab onFilter={onFilter} onSearch={onSearch}/>

                    </div>
                    <div className={'w-full py-[40px]'}>
                        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-[40px]'}>
                            {isLoading === true &&
                            [...Array(3)].map((_, key) => {
                                return <PostCardShimmer key={`shimmer-${key}`}/>
                            })
                            }


                            {isLoading === false &&
                            [...Array(3)].map((_, key) => {
                                return <PostCard key={`shimmer-${key}`}/>
                            })

                            }

                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                title="ADD POST"
                width={720}
                onClose={onClose}
                open={global.isAddPostModal === 'open'}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <AddPost onMessage={onMessage}/>
            </Drawer>
        </>
    )
}