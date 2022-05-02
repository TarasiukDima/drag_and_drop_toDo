import React, { FC } from 'react';
import './index.scss';

const Header: FC = () => {
    return (
        <header className="header">
            <h1 className="header__title">Drag-and-drop Task List</h1>
        </header>
    );
};

export default Header;
