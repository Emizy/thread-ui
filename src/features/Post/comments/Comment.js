export const Comment = ({comment, userId}) => {
    const canEdit = userId === comment.user_id
    return (
        <>
            <div className={'w-full py-[10px]'}>
                <div className={'flex'}>
                    <div className={'w-[10%]'}>
                        <div className={'w-10 h-10 bg-gray-300 rounded-full'}/>
                    </div>
                    <div className={'w-[90%]'}>
                        <div className={'flex gap-3'}>
                            <p className={'w-[80%] text-justify'}>
                                {comment.body}
                            </p>
                            <p className={'w-[20%]'}>
                                {new Date(comment.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                        <div className={'w-full flex divide-x gap-4 py-[15px]'} data-testid={'comment-action'}>
                            <div className={'pr-[5px]'}>
                                <ul className={'flex gap-3 text-[12px] font-medium'}>
                                    <li>
                                        <span className={'cursor-pointer'}>Reply</span>
                                    </li>
                                    {
                                        comment.total_replies > 0 &&
                                        <li>
                                            <div className={'w-1 h-1 mt-[6px] rounded-full bg-gray-300'}/>
                                        </li>
                                    }
                                    {
                                        comment.total_replies > 0 &&
                                        <li>
                                            {comment.total_replies} {comment.total_replies > 1 ? 'Replies' : 'Reply'}
                                        </li>
                                    }

                                </ul>
                            </div>
                            {
                                canEdit === true &&
                                <div className={'pl-[10px]'}>
                                    <ul className={'flex gap-3 text-[12px] font-medium'}>
                                        <li>
                                            <span className={'cursor-pointer'}>Edit</span>
                                        </li>
                                    </ul>
                                </div>
                            }
                            <div className={'pl-[10px]'}>
                                <ul className={'flex gap-3 text-[12px] font-medium'}>
                                    <li>
                                        <span className={'cursor-pointer text-red-500'}>Delete</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={'w-full py-[10px]'}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}