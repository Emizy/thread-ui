import {render, screen, fireEvent} from '@testing-library/react';
import {Header} from "../Header";
import {useSelector, useDispatch} from "react-redux";
import React from "react";
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import {testLogin} from "../../../store/mutation";

const MockComponent = () => {
    const global = useSelector(state => state.global)
    return (
        <>
            {
                global.isLoginModal === 'open' && <span data-testid={'mocked'}>Mocked</span>
            }
            <Header title={'site-blog'}/>
        </>

    )
}
const MockLoginComponent = () => {
    const global = useSelector(state => state.global)
    const dispatcher = useDispatch()
    const handleLogin = () => {
        dispatcher(testLogin())
    }
    return (
        <>
            <button data-testid={'mock-login'} onClick={() => handleLogin()}>Login</button>
            <Header title={'site-blog'}/>
        </>

    )
}
describe('Header section test', () => {
    it('should display correct site title', () => {
        render(<BaseIndexComponent childComponent={<Header title={'BiteBlog'}/>}/>)
        const titleElement = screen.getByTestId('site-title')
        expect(titleElement.textContent).toBe('BiteBlog')
    })
    it('should display login modal once get access is clicked', () => {
        render(<BaseIndexComponent childComponent={<MockComponent/>}/>)
        const btnElement = screen.getByTestId('btn-access')
        fireEvent.click(btnElement)
        const mockElement = screen.getByTestId('mocked')
        expect(mockElement.textContent).toBe('Mocked')
    });
    it('should display header action button when user logged in', () => {
        render(<BaseIndexComponent childComponent={<MockLoginComponent/>}/>)
        const btnElement = screen.getByTestId('mock-login')
        fireEvent.click(btnElement)
        const mockElement = screen.getByTestId('is-authenticated')
        expect(mockElement).toHaveClass('authenticated-panel')
    });
})