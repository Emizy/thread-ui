import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import {act} from "react-dom/test-utils"
import {useDispatch} from "react-redux";
import axios from "axios";
import {cleanup} from "@testing-library/react";
import {testSetPosts} from "../../../store/post/mutation";
import {AddPost} from "../AddPost";
import {useEffect, useState} from "react";
import {testLogin} from "../../../store/mutation";
import App from "../../../App";


const MockAddPost = () => {
    const [message, setMessage] = useState('')
    const dispatcher = useDispatch()
    const onUploadComplete = jest.fn();
    const onMessage = (payload) => {
        console.log(payload)
        setMessage(payload?.message)
    }
    useEffect(() => {
        dispatcher(testLogin({
            isAuthenticated: 'LoggedIn',
            user: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                id: 6
            },
            token: {
                access: 'test-access-token',
                refresh: 'test-refresh-token',
            }
        }))
    }, [])
    return (
        <>
            <span data-testid={'message'}>
                {message}
            </span>
            <AddPost onMessage={onMessage}/>
        </>
    )
}
describe('Add post component test suites', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    afterEach(() => {
        cleanup()
    })
    beforeEach(() => {
        jest.mock("axios", () => {
            return {
                create: jest.fn(() => {
                    return {
                        post: jest.fn().mockResolvedValue({
                            status: 201,
                            data: {
                                id: 1,
                                title: 'Test title',
                                description: 'Test description',
                                image: 'http://127.0.0.1:8000/media/image/image.jpg',
                                publish: true
                            },
                        }),
                        interceptors: {
                            request: {use: jest.fn(), eject: jest.fn()},
                            response: {use: jest.fn(), eject: jest.fn()}
                        }
                    }
                }),
            };

        })
        jest.mock("antd", () => {
            const antd = jest.requireActual("antd");
            const {Upload} = antd;
            return {...antd, Upload}
        });
    })
    it('should verify user can submit form', async () => {
        render(<BaseIndexComponent childComponent={<MockAddPost/>}/>)

        const titleElement = screen.getByTestId('title')
        const descriptionElement = screen.getByTestId('description')
        const publishElement = screen.getByTestId('publish')
        const submitElement = screen.getByTestId('submit')

        act(() => {
            fireEvent.input(titleElement, {target: {value: 'New Post'}})
        })
        act(() => {
            fireEvent.input(descriptionElement, {target: {value: 'New Description'}})
        })
        act(() => {
            fireEvent.input(publishElement, {target: {checked: true}})
        })
        act(() => {
            fireEvent.click(submitElement)
        })

    });
})