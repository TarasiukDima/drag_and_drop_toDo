import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders App', () => {
    render(<App />);

    const header = screen.getByRole('banner');
    const title = screen.getByRole('heading');
    const form = screen.getByRole('textbox');
    const list = screen.queryByRole('list');

    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
});
