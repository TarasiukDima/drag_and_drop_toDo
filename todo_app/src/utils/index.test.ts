import { mockListItems } from '../settings/testData';
import { randNumber, checkKeysInObj, checkNotOverviewCoords } from './index';

describe('Test Utils', () => {
    describe('randNumber', () => {
        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('return random value', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.2);
            const result = randNumber(100, 0);
            expect(result).toBe(20);
        });

        it('return max value', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
            const result = randNumber(5);
            expect(result).toBe(5);
        });

        it('return min value', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
            const result = randNumber(10, 0);
            expect(result).toBe(0);
        });
    });

    describe('checkNotOverviewCoords', () => {
        const minValue = 0;
        const maxValue = 100;
        const withoutCoef = 0;
        const bigCoef = 100;

        it('normal coords more then minvalue  and less then max', () => {
            const result = checkNotOverviewCoords(10, minValue, maxValue, withoutCoef);
            expect(result).toBe(10);
        });

        it('less min value', () => {
            const result = checkNotOverviewCoords(-100, minValue, maxValue, withoutCoef);
            expect(result).toBe(0);
        });

        it('more max value', () => {
            const result = checkNotOverviewCoords(120, minValue, maxValue, withoutCoef);
            expect(result).toBe(maxValue);
        });

        it('more min value and with big coef', () => {
            const result = checkNotOverviewCoords(1, minValue, maxValue, bigCoef);
            expect(result).toBe(0);
        });
    });

    describe('checkKeysInObj', () => {
        it('good result', () => {
            const result = checkKeysInObj(
                ['id', 'text', 'classColor', 'x', 'y', 'zIndex'],
                mockListItems[0]
            );

            expect(result).toBeTruthy();
        });

        it('bad result', () => {
            const result = checkKeysInObj(['badkey'], mockListItems[0]);

            expect(result).not.toBeTruthy();
        });
    });
});
