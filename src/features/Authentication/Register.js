import {useEffect, useReducer, useState} from "react";
import {useDispatch} from "react-redux";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {BiLoaderCircle} from "react-icons/bi";
import {toggleLogin} from "../../store/mutation";
import {onRegister} from "../../api/Auth";
import useErrorFormat from "../../utility/custom-hooks/useErrorFormat";

const FormReducer = (state, action) => {
    switch (action.type) {
        case 'update-first-name':
            return {...state, first_name: action.value}
        case 'update-last-name':
            return {...state, last_name: action.value}
        case 'update-email':
            return {...state, email: action.value}
        case 'update-password':
            return {...state, password: action.value}
        case 'update-address':
            return {...state, address: action.value}
        case 'reset':
            return {
                ...state,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                address: '',
            }
        default:
            return state
    }

}
export const Register = ({onMessage}) => {
    const [data, handleError] = useErrorFormat('')
    const [state, dispatch] = useReducer(FormReducer, {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            address: '',
        }
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
        await onRegister(state).then(resp => {
            dispatch({'type': 'reset'})
            onMessage({
                type: 'success',
                message: resp.data.message
            })
            dispatcher(toggleLogin({
                status: 'open'
            }))
        }).catch(err => {
            handleError(err)
        })
        setIsProcessing(false)
    }
    useEffect(() => {
        if (data !== '' && data?.length > 0) {
            onMessage({
                type: 'error',
                message: data
            })
            handleError('')
        }
    }, [data])
    return (
        <div>
            <form className={'w-full py-[20px]'}>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                    <div className={'pb-[20px]'}>
                        <label className={'py-[15px] mb-[10px]'}>First Name</label>
                        <input type={'text'} value={state.first_name} data-testid={'first-name'}
                               onInput={(e) => dispatch({'type': 'update-first-name', 'value': e.target.value})}
                               className={'w-full mt-[10px]  rounded-[3px] h-[35px] px-[11px] text-[14px] border outline-none hover:outline-none'}/>
                    </div>
                    <div className={'pb-[20px]'}>
                        <label className={'py-[15px] mb-[10px]'}>Last Name</label>
                        <input type={'text'} value={state.last_name} data-testid={'last-name'}
                               onInput={(e) => dispatch({'type': 'update-last-name', 'value': e.target.value})}
                               className={'w-full mt-[10px]  rounded-[3px] h-[35px] px-[11px] text-[14px] border outline-none hover:outline-none'}/>
                    </div>
                </div>
                <div className={'pb-[20px]'}>
                    <label className={'py-[15px] mb-[10px]'}>Email</label>
                    <input type={'email'} value={state.email} data-testid={'email'}
                           onInput={(e) => dispatch({'type': 'update-email', 'value': e.target.value})}
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
                    <input type={`${isOpen === true ? 'text' : 'password'}`} value={state.value}
                           data-testid={'password'}
                           onInput={(e) => dispatch({'type': 'update-password', 'value': e.target.value})}
                           className={'w-full mt-[10px] h-[35px] rounded-[3px] pl-[11px] pr-[31px] text-[14px] border outline-none hover:outline-none'}/>
                </div>
                <div className={'pb-[20px]'}>
                    <label className={'py-[15px] mb-[10px]'}>Address</label>
                    <input type={'text'} value={state.address} data-testid={'address'}
                           onInput={(e) => dispatch({'type': 'update-address', 'value': e.target.value})}
                           className={'w-full mt-[10px]  rounded-[3px] h-[35px] px-[11px] text-[14px] border outline-none hover:outline-none'}/>
                </div>
                <div className={'pb-[20px]'}>
                    <button type={'submit'} onClick={(e) => onSubmit(e)} disabled={isProcessing} data-testid={'submit'}
                            className={'w-full mt-[10px]  rounded-[5px] bg-[#0371E0] text-white h-[35px] text-center flex justify-center px-[10px] text-[15px] border outline-none hover:outline-none'}>
                        {isProcessing === false && <span className={'mt-[6px]'}>
                                            Sign Up
                                        </span>}
                        {isProcessing === true &&
                        <span className={'mt-[6px]'}><BiLoaderCircle
                            className={'animate-spin text-[20px]'}/></span>}
                    </button>
                </div>
                <div className={'w-full text-center pt-[20px] flex justify-center'}>
                                        <span className={'text-[14px] font-semibold flex gap-4 cursor-pointer'}
                                              onClick={() => dispatcher(toggleLogin({
                                                  status: 'open'
                                              }))}>
                                            Already have an account? <p className={'text-[#0371E0]'}>
                                            Sign In
                                        </p>
                                        </span>
                </div>
            </form>
        </div>
    )
}