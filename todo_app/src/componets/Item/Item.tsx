import React, { FC, useState } from 'react';
import { TChangeItemFields } from '../Content/Content';
import { ICoordsMouse, TButtonHandler, TColorsItem, TRemoveItem } from '../../types/common';
import './index.scss';

type TMoveHandler<T> = (event: T) => void;

export interface ITodoItem extends ICoordsMouse {
    id: number | string;
    text: string;
    classColor: TColorsItem;
    zIndex: number;
}

interface ITodoItemProps extends ITodoItem {
    removeToDo: TRemoveItem;
    changeItemPosition: TChangeItemFields;
}

const Item: FC<ITodoItemProps> = ({
    text,
    removeToDo,
    changeItemPosition,
    id,
    classColor,
    x,
    y,
    zIndex,
}: ITodoItemProps) => {
    const [coords, setCoords] = useState<ICoordsMouse>({ x: 0, y: 0 });

    const buttonHandler: TButtonHandler = (event) => {
        event.stopPropagation();
        removeToDo(id);
    };

    const sendInfoDragAndDrop = (event: React.DragEvent, end = false) => {
        const { clientX, clientY, target } = event;
        const { offsetWidth, offsetHeight } = target as HTMLLIElement;

        changeItemPosition(
            id,
            {
                x: clientX - coords.x,
                y: clientY - coords.y,
                width: offsetWidth,
                height: offsetHeight,
            },
            end
        );
    };

    const dragStartHandler: TMoveHandler<React.DragEvent<HTMLLIElement>> = (event) => {
        const { clientX, clientY, target } = event;
        const { offsetLeft, offsetTop } = target as HTMLLIElement;

        setCoords({ x: clientX - offsetLeft, y: clientY - offsetTop });
    };

    const dragHandler: TMoveHandler<React.DragEvent<HTMLLIElement>> = (event) => {
        sendInfoDragAndDrop(event);
    };

    const dragEndHandler: TMoveHandler<React.DragEvent<HTMLLIElement>> = (event) => {
        sendInfoDragAndDrop(event, true);
        setCoords({ x: 0, y: 0 });
    };

    const dragOverHandler: TMoveHandler<React.DragEvent<HTMLLIElement>> = (event) => {
        event.stopPropagation();
    };

    const sendInfoTouch = (event: React.TouchEvent, end = false) => {
        const { clientX, clientY } = event.changedTouches[0];
        const { offsetWidth, offsetHeight } = event.target as HTMLLIElement;

        changeItemPosition(
            id,
            {
                x: clientX - coords.x,
                y: clientY - coords.y,
                width: offsetWidth,
                height: offsetHeight,
            },
            end
        );
    };

    const touchStartHandler: TMoveHandler<React.TouchEvent<HTMLLIElement>> = (event) => {
        const { clientX, clientY } = event.touches[0];
        const { offsetLeft, offsetTop, nodeName, className } = event.target as HTMLLIElement;

        if (nodeName === 'BUTTON' && className === 'todo-item__button') {
            event.stopPropagation();
            removeToDo(id);
        }

        setCoords({ x: clientX - offsetLeft, y: clientY - offsetTop });
    };

    const touchHandler: TMoveHandler<React.TouchEvent<HTMLLIElement>> = (event) => {
        sendInfoTouch(event);
    };

    const touchEndHandler: TMoveHandler<React.TouchEvent<HTMLLIElement>> = (event) => {
        sendInfoTouch(event, true);
        setCoords({ x: 0, y: 0 });
    };

    return (
        <li
            className={`todo-content__list_item todo-item ${classColor}`}
            draggable="true"
            onDragStart={dragStartHandler}
            onDrag={dragHandler}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onTouchStart={touchStartHandler}
            onTouchMove={touchHandler}
            onTouchEnd={touchEndHandler}
            style={{ top: y + 'px', left: x + 'px', zIndex: zIndex }}
        >
            <span className="todo-item__content">{text}</span>
            <button className="todo-item__button" onClick={buttonHandler}>
                &#10005;
            </button>
        </li>
    );
};

export default Item;
