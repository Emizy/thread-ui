import {useReducer, useState} from "react";
import {BiLoaderCircle} from "react-icons/bi";
import {Upload} from 'antd';
import {onCreatePost} from "../../api/Post";
import useErrorFormat from "../../utility/custom-hooks/useErrorFormat";
import {useDispatch} from "react-redux";
import {toggleAddPost} from "../../store/mutation";

const FormReducer = (state, action) => {
    switch (action.type) {
        case 'update-title':
            return {...state, title: action.value}
        case 'update-description':
            return {...state, description: action.value}
        case 'update-publish':
            return {...state, publish: action.value}
        case 'reset':
            return {
                ...state,
                title: '',
                description: '',
                publish: false
            }
        default:
            return state
    }

}
export const AddPost = ({onMessage}) => {
    const [data, handleError] = useErrorFormat()
    const dispatcher = useDispatch()
    const [isProcessing, setIsProcessing] = useState(false)
    const [fileList, setFileList] = useState([])
    const [state, dispatch] = useReducer(FormReducer, {
        title: '',
        description: '',
        publish: false,
        fileList: '',
    })
    const fileProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            if (["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
                setFileList([...fileList, file]);
                return false;
            } else {
                return false
            }

        },
        fileList
    };
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!state.title) {
            onMessage({
                type: 'error',
                message: 'Title is required'
            })
            return
        }
        if (!state.description) {
            onMessage({
                type: 'error',
                message: 'Description is required'
            })
            return
        }
        if (fileList.length < 1) {
            onMessage({
                type: 'error',
                message: 'Kindly upload post image'
            })
            return false
        }
        let formData = new FormData()
        formData.append('image', fileList[0])
        formData.append('title', state.title)
        formData.append('description', state.description)
        formData.append('publish', state.publish)
        setIsProcessing(true)
        await onCreatePost(formData).then(resp => {
            dispatch({
                type: 'reset'
            })
            setFileList([])

            dispatcher(toggleAddPost({
                status: 'close'
            }))
            onMessage({
                type: 'success',
                message: 'Post created'
            })
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
        <>
            <form className={'w-full py-[20px]'}>
                <div className={'pb-[20px]'}>
                    <label className={'py-[15px] font-medium text-[15px] mb-[10px]'}>Title</label>
                    <input type={'text'} value={state.title} max={200} required={true}
                           onInput={(e) => dispatch({'type': 'update-title', 'value': e.target.value})}
                           className={'w-full mt-[10px]  rounded-[3px] h-[35px] px-[11px] text-[14px] border outline-none hover:outline-none'}/>
                </div>
                <div className={'pb-[20px]'}>
                    <label className={'py-[15px] font-medium text-[15px]  mb-[10px]'}>Description</label>
                    <textarea required={true} value={state.description}
                              className={'w-full mt-[10px] min-h-[150px] border outline-none p-[10px] rounded-[3px]'}
                              onInput={(e) => dispatch({'type': 'update-description', 'value': e.target.value})}/>
                </div>
                <div className={'pb-[20px] flex gap-6'}>
                    <label className={'py-[15px] font-medium text-[15px] mb-[10px] w-[15%]'}>Publish Post </label>
                    <div className={'w-[70%]'}>
                        <input onChange={(e) => dispatch({'type': 'update-publish', 'value': e.target.checked})}
                               type={'checkbox'} className={'w-3 h-3 pl-[20px] mt-[19px]'}/>
                    </div>
                </div>
                <div className={'pb-[20px] flex gap-6'}>
                    <label className={'py-[5px] font-medium text-[15px] mb-[1px] w-[15%]'}>Image: </label>
                    <div className={'w-[70%]'}>
                        <Upload {...fileProps} className={'w-[100%] custom-upload'} maxCount={1}>
                            <div
                                className={'w-[99%] px-[18px] py-[5px] text-center h-[36px] border rounded-[10px] bg-white'}>Click
                                to upload
                                image
                            </div>
                        </Upload>
                    </div>
                </div>

                <div className={'pb-[20px]'}>
                    <button type={'button'} onClick={(e) => onSubmit(e)}
                            className={'w-full mt-[10px]  rounded-[5px] bg-[#0371E0] text-white h-[35px] text-center flex justify-center px-[10px] text-[15px] border outline-none hover:outline-none'}>
                        {isProcessing === false && <span className={'mt-[6px]'}>
                                           CREATE POST
                                        </span>}
                        {isProcessing === true &&
                        <span className={'mt-[6px]'}><BiLoaderCircle
                            className={'animate-spin text-[20px]'}/></span>}
                    </button>
                </div>
            </form>

        </>
    )
}