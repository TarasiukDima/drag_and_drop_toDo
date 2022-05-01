import React from 'react';
import { TRemoveItem } from '../Content/Content';
import Item, { ITodoItem } from '../Item/Item';

interface ITodoListProps {
    todoList: Array<ITodoItem>;
    removeToDo: TRemoveItem;
}
const List = ({ todoList, removeToDo }: ITodoListProps) => {
    return (
        <ul className="todo-content__list">
            {todoList.map((oneToDo: ITodoItem) => (
                <Item key={oneToDo.id} {...oneToDo} removeToDo={removeToDo} />
            ))}
        </ul>
    );
};

export default List;
