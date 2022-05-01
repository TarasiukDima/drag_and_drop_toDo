import React, { FC } from 'react';
import { TButtonHandler } from '../../types';
import { TColorsItem, TRemoveItem } from '../Content/Content';
import './index.scss';

export interface ITodoItem {
    id: number | string;
    text: string;
    classColor: TColorsItem;
}
export interface ITodoItemProps extends ITodoItem {
    removeToDo: TRemoveItem;
}

const Item: FC<ITodoItemProps> = ({ text, removeToDo, id, classColor }: ITodoItemProps) => {
    const buttonHandler: TButtonHandler = (event) => {
        event.stopPropagation();
        removeToDo(id);
    };

    return (
        <li className={`todo-content__list_item todo-item ${classColor}`}>
            <span className="todo-item__content">{text}</span>
            <button className="todo-item__button" onClick={buttonHandler}>
                &#10005;
            </button>
        </li>
    );
};

export default Item;
