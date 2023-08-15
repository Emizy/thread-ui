import {render, screen, fireEvent} from '@testing-library/react';
import {BaseIndexComponent} from "../../../__test__/BaseIndexComponent";
import {Register} from "../Register";
import axios from "axios";
import {Login} from "../Login";
import {act} from "react-dom/test-utils";

describe('Register test suite', () => {
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
    it('should display form correctly', () => {
        render(<BaseIndexComponent childComponent={<Register/>}/>)
        const firstNameElement = screen.getByTestId('first-name')
        const lastNameElement = screen.getByTestId('last-name')
        const emailElement = screen.getByTestId('email')
        const addressElement = screen.getByTestId('address')
        const passwordElement = screen.getByTestId('password')
        fireEvent.input(firstNameElement, {target: {value: 'John'}})
        fireEvent.input(lastNameElement, {target: {value: 'Doe'}})
        fireEvent.input(emailElement, {target: {value: 'johndoe@gmail.com'}})
        fireEvent.input(addressElement, {target: {value: 'No 10 Scarborough toronto'}})
        fireEvent.input(passwordElement, {target: {value: '1234567890'}})
        const submitElement = screen.getByTestId('submit')
        const gottenValue = [firstNameElement.value, lastNameElement.value, emailElement.value, addressElement.value, passwordElement.value, submitElement.textContent]
        const expectValue = ["John", "Doe", "johndoe@gmail.com", "No 10 Scarborough toronto", "1234567890", "Sign Up"]
        expect(gottenValue).toEqual(expectValue)
    })
    it('should display register user', () => {
        render(<BaseIndexComponent childComponent={<Register/>}/>)
        const firstNameElement = screen.getByTestId('first-name')
        const lastNameElement = screen.getByTestId('last-name')
        const emailElement = screen.getByTestId('email')
        const addressElement = screen.getByTestId('address')
        const passwordElement = screen.getByTestId('password')
        fireEvent.input(firstNameElement, {target: {value: 'John'}})
        fireEvent.input(lastNameElement, {target: {value: 'Doe'}})
        fireEvent.input(emailElement, {target: {value: 'johndoe@gmail.com'}})
        fireEvent.input(addressElement, {target: {value: 'No 10 Scarborough toronto'}})
        fireEvent.input(passwordElement, {target: {value: '1234567890'}})
        const submitElement = screen.getByTestId('submit')
        act(() => {
            fireEvent.click(submitElement)
        })
        axios.post = jest.fn().mockResolvedValue({
            status: 200,
            data: 'Account created successfully'
        })
        axios.post.call()
        expect(axios.post).toHaveBeenCalledTimes(1)
    })
})