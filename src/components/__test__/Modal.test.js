import {render, screen, fireEvent} from '@testing-library/react';
import {Modal} from "../Modal";
import {useState} from "react";

const MockComponent = () => {
    const [status, setStatus] = useState(true)
    const handleClose = () => {
        setStatus(false)
    }
    return (
        <div>
            {status === false && <span data-testid={'mock-component'}>
                Mocked
            </span>}
            {
                status && <Modal title={'Add Post'} setIsOpen={handleClose}/>
            }
        </div>
    )
}
const MockSmallComponent = () => {
    return (
        <>
            <span data-testid={'mock-span'}>Testing</span>
        </>
    )
}
describe('Modal test', () => {
    it('should display correct modal title', () => {
        render(<Modal title={'Add Post'}/>)
        const titleElement = screen.getByTestId('modal-title')
        expect(titleElement.textContent).toBe('Add Post')
    });
    it('should emit close modal event', () => {
        render(<MockComponent/>)
        const btnCloseElement = screen.getByTestId('modal-close-btn')
        fireEvent.click(btnCloseElement)
        const mockElement = screen.getByTestId('mock-component')
        expect(mockElement.textContent).toBe('Mocked')

    });
    it('should contain modal content', () => {
        render(<Modal htmlBody={<MockSmallComponent/>}/>)
        const spanElement = screen.getByTestId('mock-span')
        expect(spanElement.textContent).toBe('Testing')
    });
})