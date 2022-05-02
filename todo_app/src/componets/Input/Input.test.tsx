import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testClassName, testText } from '../../settings/testData';
import Input from './Input';

describe('Input', () => {
    it('render required input', () => {
        render(<Input type="text" name="test_input" />);

        const textInput = screen.getByRole('textbox');

        expect(textInput).toBeInTheDocument();
    });

    it('render className input', () => {
        render(<Input type="text" name="test_input" className={testClassName} />);

        const textInput = screen.getByRole('textbox');

        expect(textInput).toBeInTheDocument();
        expect(textInput).toHaveClass(testClassName);
    });

    it('render checkbox', () => {
        render(<Input type="checkbox" name="test_input" />);

        const checkboxInput = screen.getByRole('checkbox');

        expect(checkboxInput).toBeInTheDocument();
        expect(checkboxInput).not.toBeChecked();

        userEvent.click(checkboxInput);
        expect(checkboxInput).toBeChecked();
    });

    it('check onChange input', () => {
        const onChange = jest.fn();

        render(<Input type="text" name="test_input" onChange={onChange} />);

        const textInput = screen.getByRole('textbox');

        expect(textInput).toBeInTheDocument();

        userEvent.type(textInput, testText);

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(testText.length);
    });
});
