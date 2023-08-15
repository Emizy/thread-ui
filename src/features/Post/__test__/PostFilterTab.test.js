import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import {PostFilterTab} from "../PostFilterTab";
import React, {useEffect, useState} from "react";
import {act} from "react-dom/test-utils"
import {testLogin} from "../../../store/mutation";
import {useDispatch, useSelector} from "react-redux";

const MockMyPostTabVisible = () => {
    const [action, setAction] = useState('')
    const global = useSelector(state => state.global)
    const dispatcher = useDispatch()
    const onSearch = (e) => {
        setAction('search')
    }
    const onFilter = (e) => {
        setAction(e)
    }
    const handleLogin = () => {
        dispatcher(testLogin({
            isAuthenticated: 'LoggedIn',
            user: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                id: 1
            },
            token: {
                access: 'test-access-token',
                refresh: 'test-refresh-token',
            }

        }))
    }
    return (
        <>
            {
                action === 'search' &&
                <span data-testid={'mock-search'}>
                        Mocked
                    </span>
            }
            {
                action === 'all' &&
                <span data-testid={'mock-filter'}>
                        Mocked Filter
                    </span>
            }
            {
                action === 'personal' &&
                <span data-testid={'mock-filter'}>
                       {global.user?.first_name} {global.user?.last_name}
                    </span>
            }

            <button data-testid={'mock-login'} onClick={() => handleLogin()}>Login</button>
            <PostFilterTab onFilter={onFilter} onSearch={onSearch}/>
        </>
    )
}
describe('Test post filter tab ', () => {
    it('should display all and search field only', () => {
        render(<BaseIndexComponent childComponent={<PostFilterTab/>}/>)
        const allBtn = screen.getByTestId('all')
        const searchInput = screen.getByTestId('search')
        expect([allBtn.textContent, searchInput.placeholder]).toEqual(['All', 'Search...'])
    })
    it('should display emit on search method', async () => {
        render(<BaseIndexComponent childComponent={<MockMyPostTabVisible/>}/>)
        const searchInput = screen.getByTestId('search')
        act(() => {
            fireEvent.input(searchInput, {target: {value: 'Test'}})
        })
        const mockText = await screen.getByTestId('mock-search')
        await waitFor(() => expect(mockText.textContent).toEqual('Mocked'))
    })
    it('should display emit on filter method', async () => {
        render(<BaseIndexComponent childComponent={<MockMyPostTabVisible/>}/>)
        const btnElement = screen.getByTestId('all')
        act(() => {
            fireEvent.click(btnElement)
        })
        const mockText = await screen.getByTestId('mock-filter')
        await waitFor(() => expect(mockText.textContent).toEqual('Mocked Filter'))
    })
    it('should display my post tab once user is logged in', async () => {
        render(<BaseIndexComponent childComponent={<MockMyPostTabVisible/>}/>)
        const btnElement = screen.getByTestId('mock-login')
        act(() => {
            fireEvent.click(btnElement)
        })
        const mockText = await screen.getByTestId('personal')
        await waitFor(() => expect(mockText.textContent).toEqual('My Post'))
    })
    it('should emit personal when my post tab is clicked', async () => {
        render(<BaseIndexComponent childComponent={<MockMyPostTabVisible/>}/>)
        const btnElement = screen.getByTestId('mock-login')
        act(() => {
            fireEvent.click(btnElement)
        })
        const personalBtn = await screen.getByTestId('personal')
        act(() => {
            fireEvent.click(personalBtn)
        })
        const mockText = await screen.getByTestId('mock-filter')
        await waitFor(() => expect(mockText.textContent).toEqual('John Doe'))
    })
})