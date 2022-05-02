import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LOCALSTORAGE_NAME } from '../../settings';
import { mockListItems, testText } from '../../settings/testData';
import Content from './Content';

interface IFakeStore {
    [key: string]: string;
}

describe('Home', () => {
    const localstorageMock = jest.fn(() => {
        let store: IFakeStore = {};
        return {
            getItem: function (key: string) {
                return store[key];
            },
            setItem: function (key: string, value: string) {
                store[key] = value.toString();
            },
            clear: function () {
                store = {};
            },
            removeItem: function (key: string) {
                delete store[key];
            },
        };
    });

    beforeAll(() => {
        const globalObj = typeof window !== 'undefined' ? window : global;
        Object.defineProperty(globalObj, 'localStorage', {
            value: localstorageMock(),
        });
    });

    beforeEach(() => {
        localStorage.clear();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('renders with value in localstorage', () => {
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(mockListItems));

        render(<Content />);

        const listItems = screen.getAllByRole('listitem');

        expect(listItems).toHaveLength(mockListItems.length);
    });

    test('renders with value in localstorage(error value)', () => {
        localStorage.setItem(LOCALSTORAGE_NAME, 'asdfasdfasdf');

        render(<Content />);

        const list = screen.queryByRole('list');
        const listItems = screen.queryAllByRole('listitem');

        expect(list).not.toBeInTheDocument();
        expect(listItems).toHaveLength(0);
    });

    test('check add and remove items', () => {
        render(<Content />);

        const input = screen.getByRole('textbox');
        const submit = screen.getByDisplayValue(/add/i);
        const list = screen.queryByRole('list');

        expect(list).not.toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        userEvent.type(input, testText);
        userEvent.click(submit);

        expect(screen.queryByRole('list')).toBeInTheDocument();
        expect(screen.queryByRole('listitem')).toBeInTheDocument();

        const removeButton = screen.queryAllByRole('button')[1];
        userEvent.click(removeButton);

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByRole('item')).not.toBeInTheDocument();
    });
});
