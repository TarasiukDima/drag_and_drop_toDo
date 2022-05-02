import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockListItems } from '../../settings/testData';
import Item from './Item';

describe('Item', () => {
    const { id, classColor, text, x, y, zIndex } = mockListItems[0];
    const removeToDo = jest.fn();
    const changeItemPosition = jest.fn();

    beforeEach(() => {
        render(
            <Item
                text={text}
                removeToDo={removeToDo}
                changeItemPosition={changeItemPosition}
                id={id}
                classColor={classColor}
                x={x}
                y={y}
                zIndex={zIndex}
            />
        );
    });

    test('renders Item', () => {
        const item = screen.getByRole('listitem');
        const content = screen.getByText(text);
        const removeBtn = screen.getByRole('button');

        expect(item).toBeInTheDocument();
        expect(item).toHaveClass('todo-item');
        expect(item).toHaveAttribute('draggable', 'true');
        expect(item).toHaveAttribute('style', `top: ${y}px; left: ${x}px; z-index: ${zIndex};`);

        expect(content).toBeInTheDocument();

        expect(removeBtn).toBeInTheDocument();
        expect(removeBtn).toHaveClass('todo-item__button');
    });

    test('check work functions', () => {
        const item = screen.getByRole('listitem');
        const removeBtn = screen.getByRole('button');

        expect(removeToDo).toHaveBeenCalledTimes(0);
        expect(changeItemPosition).toHaveBeenCalledTimes(0);

        fireEvent.drag(item, { delta: { x: -100, y: 0 } });
        expect(changeItemPosition).toHaveBeenCalledTimes(1);

        fireEvent.drag(item, { delta: { x: 100, y: 0 } });
        expect(changeItemPosition).toHaveBeenCalledTimes(2);

        fireEvent.click(removeBtn);
        expect(removeToDo).toHaveBeenCalledTimes(1);
    });
});
