import {render, screen} from '@testing-library/react';
import {EmptyComponent} from "../EmptyComponent";

describe('Empty component test', () => {
    it('should display correct text', () => {
        render(<EmptyComponent text={'Empty comment'}/>)
        const divElement = screen.getByTestId('empty-text')
        expect(divElement.textContent).toBe('Empty comment')
    });
})