import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testText } from '../../settings/testData';
import Form from './Form';

describe('Form', () => {
    const changeInputValue = jest.fn();
    const addTodo = jest.fn();

    it('renders Form without error', () => {
        render(
            <Form
                inputValue=""
                error={false}
                errorText=""
                changeInputValue={changeInputValue}
                addTodo={addTodo}
            />
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders Form with error', () => {
        render(
            <Form
                inputValue=""
                error={true}
                errorText={testText}
                changeInputValue={changeInputValue}
                addTodo={addTodo}
            />
        );

        expect(screen.getByText(testText)).toBeInTheDocument();
    });

    it('renders Form with start value', () => {
        render(
            <Form
                inputValue={testText}
                error={false}
                errorText=""
                changeInputValue={changeInputValue}
                addTodo={addTodo}
            />
        );
        const input = screen.getByRole('textbox');

        expect(input).toBeInTheDocument();
        expect(input).toHaveDisplayValue(testText);
    });

    it('check work function', () => {
        addTodo.mockImplementation((e) => {
            e.preventDefault();
        });
        render(
            <Form
                inputValue={testText}
                error={false}
                errorText=""
                changeInputValue={changeInputValue}
                addTodo={addTodo}
            />
        );

        const input = screen.getByRole('textbox');
        const submit = screen.getByRole('button');

        expect(changeInputValue).toHaveBeenCalledTimes(0);
        expect(addTodo).toHaveBeenCalledTimes(0);

        userEvent.type(input, testText);
        expect(changeInputValue).toHaveBeenCalled();
        expect(changeInputValue).toHaveBeenCalledTimes(testText.length);

        userEvent.click(submit);
        expect(addTodo).toHaveBeenCalled();
        expect(addTodo).toHaveBeenCalledTimes(1);
    });
});
