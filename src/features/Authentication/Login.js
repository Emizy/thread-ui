import {useReducer, useState} from "react";
import {useDispatch} from "react-redux";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {BiLoaderCircle} from "react-icons/bi";
import {toggleLogin, toggleRegister, setUpAuth} from "../../store/mutation";
import useErrorFormat from "../../utility/custom-hooks/useErrorFormat";
import {onLogin} from "../../api/Auth";

const FormReducer = (state, action) => {
    switch (action.type) {
        case 'update-username':
            return {...state, username: action.value}
        case 'update-password':
            return {...state, password: action.value}
        case 'reset':
            return {...state, password: '', username: ''}
        default:
            return state
    }

}
export const Login = ({onMessage}) => {
    const [data, handleError] = useErrorFormat('')
    const [state, dispatch] = useReducer(FormReducer,
        {username: '', password: ''}
    )
    const [isOpen, setIsOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const dispatcher = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        for (const [key, value] of Object.entries(state)) {
            if (!value) {
                onMessage({
                    'type': 'error',
                    'message': `${key.replace('_', ' ')} is required`
                })
                return false
            }
        }
        setIsProcessing(true)
        await onLogin(state).then(resp => {
            dispatch({'type': 'reset'})
            onMessage({
                type: 'success',
                message: 'Login successful'
            })
            dispatcher(toggleLogin({
                status: 'close'
            }))
            dispatcher(setUpAuth(resp.data))

        }).catch(err => {
            handleError(err)
            setTimeout(() => {
                onMessage({
                    type: 'error',
                    message: data
                })
            }, 100)
        })
        setIsProcessing(false)
    }
    return (
        <div>
            <form className={'w-full py-[20px] login-form'} onSubmit={(e) => onSubmit(e)} data-testid={'login-form'}>
                <div className={'pb-[20px]'}>
                    <label className={'py-[15px] mb-[10px]'}>Email</label>
                    <input type={'email'} value={state.username} data-testid={'email'}
                           onInput={(e) => dispatch({'type': 'update-username', 'value': e.target.value})}
                           className={'w-full mt-[10px]  rounded-[3px] h-[35px] px-[11px] text-[14px] border outline-none hover:outline-none'}/>
                </div>
                <div className={'pb-[20px] relative'}>
                    <label className={'py-[15px] mb-[10px]'}>Password</label>
                    <span className={'absolute top-[44px] right-[11px]'}>
                                        {isOpen === false &&
                                        <FaRegEye className={'cursor-pointer'} onClick={() => setIsOpen(true)}/>}
                        {isOpen === true &&
                        <FaRegEyeSlash className={'cursor-pointer'} onClick={() => setIsOpen(false)}/>}
                                    </span>
                    <input type={`${isOpen === true ? 'text' : 'password'}`} value={state.password}
                           data-testid={'password'}
                           onInput={(e) => dispatch({'type': 'update-password', 'value': e.target.value})}
                           className={'w-full mt-[10px] h-[35px] rounded-[3px] pl-[11px] pr-[31px] text-[14px] border outline-none hover:outline-none'}/>
                </div>
                <div className={'pb-[20px]'}>
                    <button type={'submit'} disabled={isProcessing} data-testid={'submit'}
                            className={'w-full mt-[10px]  rounded-[5px] bg-[#0371E0] text-white h-[35px] text-center flex justify-center px-[10px] text-[15px] border outline-none hover:outline-none'}>
                        {isProcessing === false && <span className={'mt-[6px]'}>
                                            Sign in
                                        </span>}
                        {isProcessing === true &&
                        <span className={'mt-[6px]'}><BiLoaderCircle
                            className={'animate-spin text-[20px]'}/></span>}
                    </button>
                </div>
                <div className={'w-full text-center pt-[20px] flex justify-center'}>
                                        <span className={'text-[14px] font-semibold flex gap-4 cursor-pointer'}
                                              onClick={() => dispatcher(toggleRegister({
                                                  status: 'open'
                                              }))}>
                                            Don’t have an account? <p className={'text-[#0371E0]'}>
                                            Sign Up
                                        </p>
                                        </span>
                </div>
            </form>
        </div>
    )
}