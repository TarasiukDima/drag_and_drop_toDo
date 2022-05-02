import React, { FC } from 'react';
import Item, { ITodoItem } from '../Item/Item';
import { TChangeItemFields } from '../Content/Content';
import { TRemoveItem } from '../../types/common';

interface ITodoListProps {
    todoList: Array<ITodoItem>;
    removeToDo: TRemoveItem;
    changeItemPosition: TChangeItemFields;
}

const List: FC<ITodoListProps> = ({ todoList, removeToDo, changeItemPosition }: ITodoListProps) => {
    return (
        <ul className="todo-content__list">
            {todoList.map((oneToDo: ITodoItem) => (
                <Item
                    key={oneToDo.id}
                    {...oneToDo}
                    removeToDo={removeToDo}
                    changeItemPosition={changeItemPosition}
                />
            ))}
        </ul>
    );
};

export default List;
