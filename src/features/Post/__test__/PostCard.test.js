import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import {act} from "react-dom/test-utils"
import {useDispatch} from "react-redux";
import {Post} from "../Post";
import axios from "axios";
import {cleanup} from "@testing-library/react";
import {PostCard} from "../PostCard";
import {truncate} from "../../../utility/utils";
import {testLogin} from "../../../store/mutation";
import React, {useEffect, useState} from "react";

const MockPostCard = () => {
    const dispatcher = useDispatch()
    const [blog, setBlog] = useState({})
    let testData = {
        description: "Constraints: I have to use core JavaScript",
        id: 1,
        image: "http://127.0.0.1:8000/media/blog/woo1.png",
        publish: false,
        slug: "how-can-i-remove-a-specific-item-from-an-array",
        title: "How can I remove a specific item from an array",
        total_comments: 3,
        user: {id: 6, "first_name": "Omowumi", "last_name": "Mary", "email": "mary@gmail.com"}
    }
    const handleEdit = (data) => {
        setBlog(data)
    }
    const handleMockLogin = () => {
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
    }
    useEffect(() => {

    }, [blog])
    return (
        <>
            {
                blog?.id === testData?.id &&
                <span data-testid={'mock-data'}>
                        Mocked
                    </span>
            }
            <button data-testid={'mock-login'} onClick={() => handleMockLogin()}>Login</button>
            <PostCard post={testData} title_count={24} handleEdit={handleEdit}/>
        </>
    )
}
describe('Test post card', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })
    afterEach(() => {
        cleanup()
    })
    beforeEach(() => {
        jest.mock("axios", () => {
            return {
                create: jest.fn(() => {
                    return {
                        get: jest.fn().mockResolvedValue({
                            status: 200,
                            data: {
                                results: [],
                                total: 1,
                                total_pages: 1,
                                page: 1
                            }
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
            const {Pagination, Drawer} = antd;
            return {...antd, Pagination, Drawer}
        })
    })
    it('should test post title displayed correctly', async () => {
        let testData = {
            description: "Constraints: I have to use core JavaScript. Frameworks are not allowed.\r\n\r\narray.remove(index) or array.pull(index) would make a lot of sense. splice is very useful, but a remove() or pull() method would be welcome... Search the internet, you will find a lot of \"What is the opposite of push() in JavaScript?\" questions. Would be great if the answare could be as simples as plain english: Pull!\r\n\r\n\r\nI'm a bit late to the party, but here's my two cents: @a2br: Array.unshift() is basically what pull() would be if it existed! @Bob: Personally, I think it's good that nothing similar to Array.remove() exists. We don't want JavaScript to end up like PHP, now do we? xD",
            id: 12,
            image: "http://127.0.0.1:8000/media/blog/woo1.png",
            publish: false,
            slug: "how-can-i-remove-a-specific-item-from-an-array",
            title: "How can I remove a specific item from an array <Updated> 000",
            total_comments: 3,
            user: {id: 6, "first_name": "Omowumi", "last_name": "Mary", "email": "mary@gmail.com"}
        }
        render(<BaseIndexComponent childComponent={<PostCard post={testData} title_count={24}/>}/>)
        const postTitle = await screen.getByTestId('post-title')
        const titleTruncate = truncate(testData.title, 24, '...')
        await waitFor(() =>
            expect(postTitle.textContent).toBe(titleTruncate))
    })
    it('should test edit and delete button not visible for unauthenticated user', async function () {
        let testData = {
            description: "Constraints: I have to use core JavaScript. Frameworks are not allowed.\r\n\r\narray.remove(index) or array.pull(index) would make a lot of sense. splice is very useful, but a remove() or pull() method would be welcome... Search the internet, you will find a lot of \"What is the opposite of push() in JavaScript?\" questions. Would be great if the answare could be as simples as plain english: Pull!\r\n\r\n\r\nI'm a bit late to the party, but here's my two cents: @a2br: Array.unshift() is basically what pull() would be if it existed! @Bob: Personally, I think it's good that nothing similar to Array.remove() exists. We don't want JavaScript to end up like PHP, now do we? xD",
            id: 12,
            image: "http://127.0.0.1:8000/media/blog/woo1.png",
            publish: false,
            slug: "how-can-i-remove-a-specific-item-from-an-array",
            title: "How can I remove a specific item from an array <Updated> 000",
            total_comments: 3,
            user: {id: 6, "first_name": "Omowumi", "last_name": "Mary", "email": "mary@gmail.com"}
        }
        render(<BaseIndexComponent childComponent={<PostCard post={testData} title_count={24}/>}/>)
        const postActionsBtn = await screen.queryByTestId('post-actions')
        await waitFor(() => expect(postActionsBtn).toBe(null))
    });
    it('should test edit and delete button is visible for authenticated user', async function () {
        render(<BaseIndexComponent childComponent={<MockPostCard/>}/>)
        const mockLoginBtn = screen.getByTestId('mock-login')
        act(() => {
            fireEvent.click(mockLoginBtn)
        })

        const postActionsBtn = await screen.getByTestId('post-actions')
        await waitFor(() => expect(postActionsBtn).toBeTruthy())
    });
    it('should test edit button is visible and clickable for authenticated user', async function () {
        render(<BaseIndexComponent childComponent={<MockPostCard/>}/>)
        const mockLoginBtn = screen.getByTestId('mock-login')
        act(() => {
            fireEvent.click(mockLoginBtn)
        })

        const postActionsBtn = await screen.getByTestId('post-edit-btn')
        act(() => {
            fireEvent.click(postActionsBtn)
        })
        const mockData = await screen.getByTestId('mock-data')
        await waitFor(()=> expect(mockData.textContent).toBe('Mocked'))
    });
})