import React, { FC } from 'react';
import { TChangeElHandler } from '../../types';

export type IInputProps = {
    type: string;
    name?: string;
    placeholder?: string;
    value?: string;
    className?: string;
    onChange?: TChangeElHandler<HTMLInputElement>;
};

const Input: FC<IInputProps> = ({
    type,
    name,
    placeholder,
    value,
    className,
    onChange,
}: IInputProps) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
    />
);

export default Input;
