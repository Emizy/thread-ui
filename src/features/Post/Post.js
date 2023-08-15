import {PostFilterTab} from "./PostFilterTab";
import {PostCard} from "./PostCard";
import {PostCardShimmer} from "./PostCardShimmer";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {toggleAddPost, toggleEditPost} from "../../store/mutation";
import {Drawer, message, Pagination} from 'antd';
import {AddPost} from "./AddPost";
import {onListPost} from "../../api/Post";
import {setPosts} from "../../store/post/mutation";
import {TOTAL_DISPLAY_POST} from "../../utility/constant";
import useErrorFormat from "../../utility/custom-hooks/useErrorFormat";
import {EmptyComponent} from "../../components/EmptyComponent";
import {EditPost} from "./EditPost";

export const Post = () => {
    const global = useSelector(state => state.global)
    const postData = useSelector(state => state.postData)
    const [data, handleError] = useErrorFormat('')
    const [tab, setTab] = useState('all')
    const [search, setSearch] = useState('')
    const [currentPost, setCurrentPost] = useState({})
    const [current, setCurrent] = useState(1)
    const dispatcher = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(true)
    const onSearch = (search) => {
        console.log(search)
    }
    const handleEdit = (post) => {
        setCurrentPost(JSON.parse(JSON.stringify(post)))
    }
    const handleClear = () => {
        setCurrentPost({})
    }
    const onMessage = (data) => {
        messageApi.open({
            type: data.type,
            content: data.message,
            duration: 10,
        });
    };
    const onClose = () => {
        setCurrentPost({})
        dispatcher(toggleAddPost({
            status: 'close'
        }))
        dispatcher(toggleEditPost({
            status: 'close'
        }))
    }
    const onFetchPost = (query) => {
        setIsLoading(true)
        onListPost({data: query}).then(res => {
            dispatcher(setPosts({
                posts: res.data.data.results,
                total: res.data.data.total,
                total_pages: res.data.data.total_pages,
                page: res.data.data.page,
            }))
        }).catch(err => {
            handleError(err)
        })
        setIsLoading(false)
    }
    useEffect(() => {
        setIsLoading(true)
        let query = `?limit=${TOTAL_DISPLAY_POST}`
        if (tab === 'personal') {
            query += `&user__id=${global?.user?.id}`
        }
        if (search) {
            query += `&search=${search}`
        }
        onFetchPost(query)
    }, [tab, search])
    useEffect(() => {
        setIsLoading(true)
        let query = `?limit=${TOTAL_DISPLAY_POST}&page=${current}`
        if (tab === 'personal') {
            query += `&user__id=${global?.user?.id}`
        }
        if (search) {
            query += `&search=${search}`
        }
        onFetchPost(query)
    }, [current])
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
    useEffect(() => {
        if (currentPost?.id) {
            dispatcher(toggleEditPost({
                status: 'open'
            }))
        }
    }, [currentPost])
    useEffect(() => {
        onFetchPost(`?limit=${TOTAL_DISPLAY_POST}`)
    }, [])
    return (
        <div>
            {contextHolder}
            <div className={'w-full py-[30px]'} data-testid={'post-container'}>
                <div className={'w-[86%] mx-auto'} id={'post-container-width'}>
                    <div className={'w-[60%] mx-auto'}>
                        <PostFilterTab onFilter={setTab} onSearch={setSearch}/>

                    </div>
                    <div className={'w-full py-[40px]'}>
                        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-[40px]'} data-testid={'post-grid-list'}>

                            {isLoading === true &&
                            [...Array(3)].map((_, key) => {
                                return <PostCardShimmer key={`shimmer-${key}`}/>
                            })
                            }

                            {isLoading === false &&
                            postData?.posts?.map((blog, key) => {
                                return <PostCard key={`blog-${key}`}
                                                 post={blog}
                                                 caption_count={244}
                                                 title_count={70}
                                                 onMessage={onMessage}
                                                 handleEdit={handleEdit}/>
                            })
                            }
                        </div>
                        {postData?.posts?.length === 0 &&
                        <div className={'w-full'} data-testid={'post-empty-container'}>
                            <div className={'w-[50%] mx-auto'}>
                                <EmptyComponent text={'No posts available'}/>

                            </div>
                        </div>
                        }
                        <div className={'mt-[40px] flex justify-center'}>
                            <Pagination defaultCurrent={1} total={postData.total} pageSize={3} onChange={setCurrent}
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
            <Drawer
                title="UPDATE POST"
                width={720}
                onClose={onClose}
                open={global.isEditPostModal === 'open'}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <EditPost post={currentPost} onMessage={onMessage} handleClear={handleClear}/>
            </Drawer>
        </div>
    )
}