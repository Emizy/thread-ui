import {PostFilterTab} from "./PostFilterTab";
import {PostCard} from "./PostCard";
import {PostCardShimmer} from "./PostCardShimmer";
import {useState} from "react";

export const Post = () => {
    const [isLoading, setIsLoading] = useState(true)
    const onFilter = (tab) => {
        console.log(tab)
    }
    const onSearch = (search) => {
        console.log(search)
    }

    return (
        <>
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
                            <PostCard/>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}