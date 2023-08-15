import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {AiOutlineLogout} from "react-icons/ai";
import {BsPlusCircle} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import {toggleLogin, purgeAuth, toggleAddPost} from "../../store/mutation";
import {extractAbbreviation} from "../../utility/utils";

export const Header = ({title}) => {
    const global = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const location = useLocation()
    const onAccess = () => {
        dispatch(toggleLogin({
            status: 'open'
        }))
    }
    const onAddPost = () => {
        dispatch(toggleAddPost(
            {
                status: 'open'
            }
        ))
    }
    const onLogout = () => {
        dispatch(purgeAuth())
    }
    return (
        <div>
            <div className={'w-full h-[75px] hidden lg:block sticky'}>
                <div className={'w-full h-full flex relative px-[102px]'}>
                    <div className={'w-[40%]'}>
                        <div className={'h-full w-full mx-auto flex py-[25px] '}>
                            <NavLink to={'/'}>
                                <div className={'flex gap-2'}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7L12.75 17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17L11.25 7C11.25 6.58579 11.5858 6.25 12 6.25ZM7 8.25C7.41421 8.25 7.75 8.58579 7.75 9V15C7.75 15.4142 7.41421 15.75 7 15.75C6.58579 15.75 6.25 15.4142 6.25 15V9C6.25 8.58579 6.58579 8.25 7 8.25ZM17 9.25C17.4142 9.25 17.75 9.58579 17.75 10V14C17.75 14.4142 17.4142 14.75 17 14.75C16.5858 14.75 16.25 14.4142 16.25 14V10C16.25 9.58579 16.5858 9.25 17 9.25Z"
                                              fill="#007bff"/>
                                    </svg>
                                    <p data-testid={'site-title'} className={'text-[30px] font-extrabold'}>{title}</p>
                                </div>

                            </NavLink>

                        </div>
                    </div>
                    <div className={'w-[60%] relative'}>
                        <div className={'py-[25px] flex justify-end relative'}>
                            {global.isAuthenticated === "LoggedIn" &&
                            <ul className={'flex divide-x authenticated-panel'} data-testid={'is-authenticated'}>
                                {location?.pathname === '/' &&
                                <li className={'px-[20px]'}>
                                    <button onClick={() => onAddPost()}
                                            className={'h-10 bg-[#007bff] font-medium px-[15px] w-[full] flex justify-between rounded-[5px] text-center border flex justify-center py-[7px] font-bold shadow'}>
                                        <span className={'pr-[20px]'}>Add Post</span> <BsPlusCircle
                                        className={'text-center text-white w-5 h-5 mt-[2px]'}/>
                                    </button>
                                </li>
                                }

                                <li className={'px-[20px]'}>
                                    <div className={'flex gap-3'}>
                                        <p className={'font-semibold py-[10px] w-[154px] truncate'}>{global.user?.first_name} {global.user?.last_name}...</p>
                                        <div
                                            className={'w-10 h-10 relative py-[7px] text-center bg-[#007bff] text-white shadow rounded-full font-bold'}>
                                            {extractAbbreviation(`${global.user?.first_name} ${global.user?.last_name}`)}
                                        </div>
                                    </div>
                                </li>
                                <li className={'px-[20px]'}>
                                    <button onClick={() => onLogout()}
                                            className={'w-10 h-10 rounded-full text-center border flex justify-center py-[7px] font-bold bg-red-500 shadow'}>
                                        <AiOutlineLogout className={'text-center w-6 h-6 text-white'}/>
                                    </button>
                                </li>
                            </ul>
                            }
                            {global.isAuthenticated === "notLoggedIn" &&
                            <ul className={'flex'}>
                                <li className={'px-[20px]'}>
                                    <button onClick={() => onAccess()} data-testid={'btn-access'}
                                            className={'bg-[#fff] border-[#007bff] border text-[#007bff] flex  cursor-pointer py-[10px] px-[30px]' +
                                            ' font-semibold  rounded-[22px] hover:bg-[#007bff] hover:text-[#fff] text-[15px] shadow-lg'}>
                                        Get Access

                                    </button>
                                </li>

                            </ul>
                            }


                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}