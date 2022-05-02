import { ITodoItem } from '../componets/Item/Item';

type TRadnNumber = (max: number, min?: number) => number;

export const randNumber: TRadnNumber = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

type TCheckNotOverviewCoords = (
    coord: number,
    valueMin: number,
    valueMax: number,
    considerMax: number
) => number;

export const checkNotOverviewCoords: TCheckNotOverviewCoords = (
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

type TCheckKeys = (arrayKeys: Array<string>, obj: ITodoItem) => boolean;

export const checkKeysInObj: TCheckKeys = (arrayKeys, obj) => {
    return arrayKeys.filter((key) => key in obj).length === arrayKeys.length;
};
