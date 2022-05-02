import React, { useEffect, useRef, useState } from 'react';
import Form from '../Form';
import List from '../List';
import { listColors, LOCALSTORAGE_NAME, MAX_ITEMS_TO_DO } from '../../settings';
import { randNumber } from '../../utils';
import { ITodoItem } from '../Item/Item';
import {
    ICoordsMouse,
    TChangeElHandler,
    TColorsItem,
    TRemoveItem,
    TSimpleFuncion,
} from '../../types/common';
import './index.scss';

export interface ICoordsInfo extends ICoordsMouse {
    width: number;
    height: number;
}

export type TChangeItemFields = (id: number | string, coordsEl: ICoordsInfo, end?: boolean) => void;

type TCheckNotOverviewCoords = (
    coord: number,
    valueMin: number,
    valueMax: number,
    considerMax: number
) => number;

const Content = () => {
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const [todoStr, setTodoStr] = useState<string>('');
    const [todoList, setTodoList] = useState<Array<ITodoItem>>([]);
    const [infoContainer, setInfoContainer] = useState<ICoordsInfo>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [zIndex, setzIndex] = useState<number>(MAX_ITEMS_TO_DO);
    const containerRef = useRef<HTMLDivElement>(null);

    // check items in localstorage
    useEffect(() => {
        const arrToDo: Array<ITodoItem> = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_NAME) || '[]'
        );

        if (arrToDo.length > 0 && arrToDo[0].hasOwnProperty('text')) {
            setTodoList(arrToDo);
        }

        // rewrite max zindex el;
        const findMaxZIndex = arrToDo.reduce((accPreority, { zIndex }) => {
            return zIndex > accPreority ? zIndex : accPreority;
        }, MAX_ITEMS_TO_DO);
        if (findMaxZIndex > zIndex) {
            setzIndex(findMaxZIndex);
        }
    }, []);

    // rewrite container drag coords
    useEffect(() => {
        const container = containerRef.current;

        setInfoContainer({
            x: container?.offsetLeft || 0,
            y: container?.offsetTop || 0,
            width: container?.offsetWidth || 0,
            height: container?.offsetHeight || 0,
        });
    }, []);

    // save items in localstorage
    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(todoList));
    }, [todoList]);

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
                classColor: listColors[randNumber(listColors.length - 1)] as TColorsItem,
                x: randNumber(infoContainer.width - (infoContainer.width * 20) / 100),
                y: randNumber(infoContainer.height - (infoContainer.height * 20) / 100),
                zIndex,
            },
        ]);
        setzIndex(zIndex + 1);
        setTodoStr('');
    };

    const checkNotOverviewCoords: TCheckNotOverviewCoords = (
        coord: number,
        valueMin: number,
        valueMax: number,
        considerMax: number
    ) => {
        if (coord < valueMin) return valueMin;

        const maxValueCan = valueMax - considerMax;

        if (coord > maxValueCan) {
            if (maxValueCan < valueMin) return valueMin;
            return maxValueCan;
        }
        return coord;
    };

    const changeItemPosition: TChangeItemFields = (id, coordsEl, end = false) => {
        const newItemsList = todoList.map((todo) => {
            if (todo.id === id) {
                const newCoords = { x: coordsEl.x, y: coordsEl.y, zIndex: todo.zIndex };

                if (end) {
                    const newZIndex = zIndex + 1;
                    newCoords.x = checkNotOverviewCoords(
                        coordsEl.x,
                        0,
                        infoContainer.width + infoContainer.x,
                        coordsEl.width
                    );
                    newCoords.y = checkNotOverviewCoords(
                        coordsEl.y,
                        0,
                        infoContainer.height + infoContainer.y,
                        coordsEl.height + infoContainer.y
                    );
                    newCoords.zIndex = newZIndex;
                    setzIndex(newZIndex);
                }

                return {
                    ...todo,
                    ...newCoords,
                };
            }
            return todo;
        });
        setTodoList(newItemsList);
    };

    const removeToDo: TRemoveItem = (id): void => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    };

    const submitHandler: TChangeElHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (todoStr.trim().length === 0) {
            changeErrorsInfo(true, 'enter some text');
            return;
        }

        if (todoList.length >= MAX_ITEMS_TO_DO) {
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
        <div className="todo-content" ref={containerRef}>
            <Form
                inputValue={todoStr}
                error={error}
                errorText={errorText}
                changeInputValue={changeText}
                addTodo={submitHandler}
            />
            <List
                todoList={todoList}
                removeToDo={removeToDo}
                changeItemPosition={changeItemPosition}
            />
        </div>
    );
};

export default Content;
