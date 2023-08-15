import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import React, {useEffect, useState} from "react";
import {act} from "react-dom/test-utils"
import {testLogin} from "../../../store/mutation";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../Post";
import axios from "axios";
import {cleanup} from "@testing-library/react";
import {testSetPosts} from "../../../store/post/mutation";

const MockPost = () => {
    const dispatcher = useDispatch()
    const handlePopulate = () => {
        dispatcher(testSetPosts({
            posts: [
                {
                    id: 1,
                    title: 'Test title',
                    description: 'Test description',
                    image: 'http://127.0.0.1:8000/media/image/image.jpg',
                    publish: true
                },
                {
                    id: 2,
                    title: 'Test title',
                    description: 'Test description',
                    image: 'http://127.0.0.1:8000/media/image/image.jpg',
                    publish: true
                },
            ],
            total: 1,
            total_pages: 1,
            page: 1
        }))
    }
    return (
        <>
            <button data-testid={'mock-populate'} onClick={() => handlePopulate()}>Login</button>
            <Post/>
        </>
    )
}
describe('Post component test', () => {
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
        });
    })
    it('should render post component correctly', async () => {
        await render(<BaseIndexComponent childComponent={<Post/>}/>)
        axios.get = await jest.fn().mockResolvedValue({
            status: 200,
            data: {
                results: [],
                total: 1,
                total_pages: 1,
                page: 1
            }
        })
        await axios.get.call()
        const postContainer = await screen.getByTestId('post-container')
        await waitFor(() => expect(postContainer).toBeTruthy())
    })
    it('should test empty component is shown when posts list is empty', async () => {
        await render(<BaseIndexComponent childComponent={<Post/>}/>)
        axios.get = await jest.fn().mockResolvedValue({
            status: 200,
            data: {
                results: [],
                total: 1,
                total_pages: 1,
                page: 1
            }
        })
        await axios.get.call()
        const postEmptyElement = await screen.getByTestId('post-empty-container')
        await waitFor(() => expect(postEmptyElement).toBeTruthy())

    });
    it('should test post container items after data populate', async () => {
        await render(<BaseIndexComponent childComponent={<MockPost/>}/>)
        axios.get = await jest.fn().mockResolvedValue({
            status: 200,
            data: {
                results: [
                    {
                        id: 1,
                        title: 'Test title',
                        description: 'Test description',
                        image: 'http://127.0.0.1:8000/media/image/image.jpg',
                        publish: true
                    }
                ],
                total: 1,
                total_pages: 1,
                page: 1
            }
        })
        await axios.get.call()
        const populate = await screen.getByTestId('mock-populate')
        act(() => {
            fireEvent.click(populate)
        })
        const postItemElement = await screen.getAllByTestId('post-item')
        await waitFor(() => expect(postItemElement).toBeTruthy())

    });
})