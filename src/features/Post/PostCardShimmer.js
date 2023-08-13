export const PostCardShimmer = () => {
    return (
        <>
            <div className={'h-[500px]'}>
                <div className={'h-[250px] w-full'}>
                    <div className={'h-[250px] w-full bg-gray-200 animate-pulse'}/>
                </div>
                <div className={'w-full py-[10px]'}>
                    <div className={'w-full h-[50px] py-[10px]'}>
                        <h4 className={'font-semibold text-[24px] mb-[5px] h-6 w-full bg-gray-200 animate-pulse'}/>
                        <h4 className={'font-semibold text-[24px] h-6 w-[70%] bg-gray-200 animate-pulse'}/>
                    </div>
                    <div className={'w-full mt-[31px] h-[125px]'}>
                        <p className={'font-normal h-3 w-[88%] mb-[7px] bg-gray-200 animate-pulse text-[15px]'}/>
                        <p className={'font-normal h-3 w-[90%] mb-[7px] bg-gray-200 animate-pulse text-[15px]'}/>
                        <p className={'font-normal h-3 w-[70%] mb-[7px] bg-gray-200 animate-pulse text-[15px]'}/>
                        <p className={'font-normal h-3 w-[90%] mb-[7px] bg-gray-200 animate-pulse text-[15px]'}/>
                        <p className={'font-normal h-3 w-[50%] mb-[7px] bg-gray-200 animate-pulse text-[15px]'}/>
                        <p className={'font-normal h-3 w-[70%] mb-[7px] bg-gray-200 animate-pulse text-[15px]'}/>
                    </div>
                    <hr/>
                    <div className={'flex justify-between py-[10px]'}>
                        <div className={'flex gap-3'}>
                            <span className={'py-[10px] w-[16px] h-[16px] bg-gray-200'}/>
                            <p className={'w-[80px] bg-gray-200 animate-pulse h-[20px]'}/>
                        </div>
                        <div className={'flex gap-3'}>
                            <span className={'py-[10px] w-[16px] h-[16px] bg-gray-200'}/>
                            <p className={'w-[80px] bg-gray-200 animate-pulse h-[20px]'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}