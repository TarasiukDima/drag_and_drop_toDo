import React, { FC } from 'react';
import { TChangeElHandler } from '../../types/common';
import Input from '../Input';
import './index.scss';

interface IFormProps {
    inputValue: string;
    error: boolean;
    errorText: string;
    changeInputValue: TChangeElHandler<HTMLInputElement>;
    addTodo: TChangeElHandler<HTMLFormElement>;
}

const Form: FC<IFormProps> = ({
    inputValue,
    error,
    errorText,
    changeInputValue,
    addTodo,
}: IFormProps) => {
    return (
        <form className="todo-content__form" onSubmit={addTodo}>
            {error && <span className="todo-content__form_error">{errorText}</span>}
            <Input
                className={`${error ? 'error' : ''} todo-content__form_input`}
                type="text"
                placeholder="Enter task"
                value={inputValue}
                onChange={changeInputValue}
            />
            <Input className="todo-content__form_submit" type="submit" value="add" />
        </form>
    );
};

export default Form;
