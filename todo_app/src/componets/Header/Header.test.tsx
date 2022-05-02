import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders learn react link', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const title = screen.getByRole('heading');

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('header__title');
    expect(title).toHaveTextContent(/Drag-and-drop/i);
});
