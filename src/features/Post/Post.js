import {PostFilterTab} from "./PostFilterTab";
import {PostCard} from "./PostCard";
import {PostCardShimmer} from "./PostCardShimmer";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {toggleAddPost} from "../../store/mutation";
import {Drawer, message, Pagination} from 'antd';
import {AddPost} from "./AddPost";
import {onListPost} from "../../api/Post";

export const Post = () => {
    const {global} = useSelector(state => state)
    const [tab, setTab] = useState('all')
    const [search, setSearch] = useState('')
    const [current, setCurrent] = useState(1)
    const [posts, setPosts] = useState({
        results: [],
        page: 1,
        total: 1,
        total_pages: 1
    })
    const dispatcher = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false)
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
    const onFetchPost = (query) => {
        setIsLoading(true)
        onListPost({data: query}).then(res => {
            setPosts({
                results: res.data.data.results,
                total: res.data.data.total,
                total_pages: res.data.data.total_pages,
                page: res.data.data.page,
            })
        }).then(err => {

        })
        setIsLoading(false)
    }
    useEffect(() => {
        let query = `?limit=3&page=${current}`
        if (tab === 'personal') {
            query += `&user__id=${global?.user?.id}`
        }
        if (search) {
            query += `&search=${search}`
        }
        onFetchPost(query)
    }, [tab, search, current])
    useEffect(() => {
        onFetchPost('?limit=3')
    }, [])
    return (
        <>
            {contextHolder}
            <div className={'w-full py-[30px]'}>
                <div className={'w-[86%] mx-auto'}>
                    <div className={'w-[60%] mx-auto'}>
                        <PostFilterTab onFilter={setTab} onSearch={setSearch}/>

                    </div>
                    <div className={'w-full py-[40px]'}>
                        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-[40px]'}>
                            {isLoading === true &&
                            [...Array(3)].map((_, key) => {
                                return <PostCardShimmer key={`shimmer-${key}`}/>
                            })
                            }

                            {isLoading === false &&
                            posts.results?.map((blog, key) => {
                                return <PostCard key={`blog_${key}`} post={blog}
                                                 caption_count={244} title_count={70}/>
                            })
                            }

                        </div>
                        <div className={'mt-[40px] flex justify-center'}>
                            <Pagination defaultCurrent={1} total={posts.total} pageSize={3} onChange={setCurrent}
                                        responsive={true}/>
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