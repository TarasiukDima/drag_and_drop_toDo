import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockListItems } from '../../settings/testData';
import List from './List';

it('List', () => {
    render(<List todoList={mockListItems} removeToDo={jest.fn()} changeItemPosition={jest.fn()} />);

    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('todo-content__list');

    expect(listItems).toHaveLength(mockListItems.length);
});
