export type TSimpleFuncion = () => void;
export type TChangeElHandler<T> = (event: React.ChangeEvent<T>) => void;
export type TButtonHandler = (event: React.MouseEvent) => void;
export type TRemoveItem = (id: number | string) => void;

export type TColorsItem = 'orange' | 'blue' | 'green' | 'red' | 'black' | 'brown';

export interface ICoordsMouse {
    x: number;
    y: number;
}
