import { formatAmount } from './FormatAmount';

const testSetup: { params: [string]; result: string }[] = [
    { params: [''], result: '' },
    { params: ['0'], result: '0' },
    { params: ['123'], result: '123' },
    { params: ['123.'], result: '123.' },
    { params: ['123.4'], result: '123.4' },
    { params: ['123.45'], result: '123.45' },
    { params: ['123.456'], result: '123.45' },
];

testSetup.forEach(({ params, result }) => {
    it(`returns ${result} when params are ${params}`, () => {
        expect(formatAmount(...params)).toBe(result);
    });
});
