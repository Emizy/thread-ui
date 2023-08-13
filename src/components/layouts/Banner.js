export const Banner = () => {
    return (
        <>
            <div className={'w-full'}>
                <div className={'w-[86%] mx-auto py-[30px]'}>
                    <div className={'w-full py-[10px]'}>
                        <ul className={'flex gap-3 '}>
                            <li className={'font-medium'}>
                                <span>Home</span>
                            </li>
                            <li className={'px-[5px]'}>
                                <div className={'w-1 h-1 rounded-full my-[10px] bg-black'}/>
                            </li>
                            <li>
                                <span className={'text-[#007bff] font-normal'}>Blog and News</span>
                            </li>
                        </ul>
                    </div>
                    <div className={'w-full py-[40px] hidden'}>
                        <div className={'w-[50%]'}>
                            <h4 className={'text-[50px] leading-[50px] font-extrabold'}>
                                Expanding Our Knowledge & Yours, One Blog at a Time.
                            </h4>
                        </div>
                        <div className={'w-[50%]'}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}