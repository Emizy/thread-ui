import {Header} from "../components/layouts/Header";
import {Outlet} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {Modal} from "../components/Modal";
import {Login} from "../features/Authentication/Login";
import {Register} from "../features/Authentication/Register";
import {toggleLogin, toggleRegister} from "../store/mutation";
import {message} from 'antd';

export const BaseComponent = () => {
    const {global} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleClose = (type) => {
        if (type === 'login') {
            dispatch(toggleLogin({
                status: 'close'
            }))
        } else {
            dispatch(toggleRegister({
                status: 'close'
            }))
        }
    }
    return (
        <>
            <Header title={'BiteBlog'}/>
            <Outlet/>
            {global.isLoginModal === 'open' &&
            <Modal title={'LOGIN'} width={'w-11/12 md:w-[40%]'} setIsOpen={() => handleClose('login')}
                   htmlBody={<Login/>}/>}
            {global.isRegisterModal === 'open' &&
            <Modal title={'CREATE AN ACCOUNT'} width={'w-11/12 md:w-[40%]'} setIsOpen={() => handleClose('register')}
                   htmlBody={<Register/>}/>}

        </>
    )
}