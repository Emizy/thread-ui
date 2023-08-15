import {render, screen, fireEvent} from '@testing-library/react';
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import {Login} from "../Login";
import axios from "axios";
import axiosMock from "axios"
import {ENDPOINT} from "../../../utility/constant";

import {act} from "react-dom/test-utils"

const MockLoginComponent = () => {
    return (
        <>

            <Login/>
        </>
    )
}

describe('Login test suites', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    beforeEach(() => {
        jest.mock("axios", () => {
            return {
                create: jest.fn(() => {
                    return {
                        post: jest.fn().mockResolvedValue({
                            status: 200,
                            data: {
                                first_name: 'John',
                                last_name: 'Doe',
                                email: 'adenitiree@gmail.com',
                            },
                            token: {
                                access: 'test-access-token',
                                refresh: 'test-refresh-token'
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
    })
    it('should display all input fields', () => {
        render(<BaseIndexComponent childComponent={<Login/>}/>)
        const emailElement = screen.getByTestId('email')
        fireEvent.input(emailElement, {target: {value: 'adenitiree@gmail.com'}})
        const passwordElement = screen.getByTestId('password')
        fireEvent.input(passwordElement, {target: {value: '1234567890'}})
        const submitElement = screen.getByTestId('submit')
        const gottenValue = [emailElement.value, passwordElement.value, submitElement.textContent]
        const expectValue = ["adenitiree@gmail.com", "1234567890", "Sign in"]
        expect(gottenValue).toEqual(expectValue)

    })
    it('should authorize user on successful login', () => {
        render(<BaseIndexComponent childComponent={<MockLoginComponent/>}/>)
        const emailElement = screen.getByTestId('email')
        fireEvent.input(emailElement, {target: {value: 'adenitiree@gmail.com'}})
        const passwordElement = screen.getByTestId('password')
        fireEvent.input(passwordElement, {target: {value: '1234567890'}})
        const submitElement = screen.getByTestId('submit')
        act(() => {
            fireEvent.click(submitElement)
        })
        axios.post = jest.fn().mockResolvedValue({
            status: 200,
            data: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'adenitiree@gmail.com',
            },
            token: {
                access: 'test-access-token',
                refresh: 'test-refresh-token'
            }
        })
        axios.post.call()
        expect(axios.post).toHaveBeenCalledTimes(1)


    });
})