import React, { useState } from 'react';
import Form from '../Form';
import List from '../List';
import { ITodoItem } from '../Item/Item';
import { TChangeElHandler, TSimpleFuncion } from '../../types';
import './index.scss';

export type TColorsItem = 'orange' | 'blue' | 'green' | 'red' | 'black' | 'brown';
export type TRemoveItem = (id: number | string) => void;

const Content = () => {
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const [todoStr, setTodoStr] = useState<string>('');
    const [todoList, setTodoList] = useState<Array<ITodoItem>>([
        {
            id: 123,
            text: 'To do 1 To do something To do something To do something To do something To do something To do something To do something To do something To do something To do something To do something',
            classColor: 'black',
        },
        {
            id: 1232,
            text: 'To do something',
            classColor: 'brown',
        },
        {
            id: 1233,
            text: 'To do something very difficult',
            classColor: 'red',
        },
    ]);
    const classes = ['orange', 'blue', 'green', 'red', 'black', 'brown'];
    const randIndex = () => Math.floor(Math.random() * (classes.length - 1 + 1)) + 0;

    const changeErrorsInfo = (showError: boolean, erroText: string) => {
        setError(showError);
        setErrorText(erroText);
    };

    const changeText: TChangeElHandler<HTMLInputElement> = (event) => {
        changeErrorsInfo(false, '');
        setTodoStr(event.target.value as string);
    };

    const addTodo: TSimpleFuncion = () => {
        setTodoList([
            ...todoList,
            {
                id: new Date().getTime(),
                text: todoStr,
                classColor: classes[randIndex()] as TColorsItem,
            },
        ]);
        setTodoStr('');
    };

    const removeToDo: TRemoveItem = (id: number | string): void => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    };

    const submitHandler: TChangeElHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (todoStr.trim().length === 0) {
            changeErrorsInfo(true, 'enter some text');
            return;
        }

        if (todoList.length >= 20) {
            changeErrorsInfo(
                true,
                'Seriously? Do you still want to add a task? Start doing something already!'
            );
            return;
        }
        addTodo();
        changeErrorsInfo(false, '');
    };

    return (
        <div className="todo-content">
            <Form
                inputValue={todoStr}
                error={error}
                errorText={errorText}
                changeInputValue={changeText}
                addTodo={submitHandler}
            />
            <List todoList={todoList} removeToDo={removeToDo} />
        </div>
    );
};

export default Content;
