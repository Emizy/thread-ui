import {useState} from "react";
import {useSelector} from "react-redux";

export const PostFilterTab = ({onFilter, onSearch}) => {
    const global = useSelector((state) => state.global)
    const [tab, setTab] = useState('all')
    const onChangeTab = (tab) => {
        setTab(tab)
        onFilter(tab)
    }
    return (
        <>
            <div className={'w-full shadow-lg bg-white border rounded-[55px] flex h-[60px]'}>
                <div className={'w-[60%]'}>
                    <ul className={'flex my-[7px]'}>
                        <li data-testid={'tab'} className={'px-[5px]'}>
                            <button onClick={() => onChangeTab('all')} data-testid={'all'}
                                    className={`px-[20px] min-w-[60px] font-semibold  text-[15px] rounded-[40px] py-[10px] ${tab === 'all' ? 'bg-[#007bff] border text-white' : 'text-black'}`}>
                                <p>All</p>
                            </button>
                        </li>
                        {
                            global.isAuthenticated === 'LoggedIn' &&
                            <li className={'px-[5px]'} data-testid={'tab'}>
                                <button onClick={() => onChangeTab('personal')} data-testid={'personal'}
                                        className={`px-[20px] min-w-[60px] font-semibold  text-[15px] rounded-[40px] py-[10px] ${tab === 'personal' ? 'bg-[#007bff] border text-white' : 'text-black'}`}>
                                    <p>My Post</p>
                                </button>
                            </li>
                        }

                    </ul>
                </div>
                <div className={'w-[5%] flex justify-center'}>
                    <div className={'h-10 my-[8px] w-[3px] bg-slate-200'}/>
                </div>
                <div className={'w-[35%] relative'}>
                    <svg width="24" height="24" className={'absolute top-[19px] left-[10px] w-4 h-4'}
                         viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z"
                              fill="#1C274C"/>
                    </svg>

                    <input onChange={(e) => onSearch(e.target.value)} data-testid={'search'} id={'test-iio'}
                           className={'w-[95%]  my-[7px] pl-[35px] py-[10px] h-[43px] bg-gray-200 border rounded-[40px] outline-none'}
                           placeholder={'Search...'}/>
                </div>
            </div>
        </>
    )
}