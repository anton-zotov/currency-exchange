import Currency from '../models/Currency';
import { getFormatCurrency } from './FormatCurrency';

const currency: Currency = {
    code: 'USD',
    label: 'United States Dollar',
    symbol: '$',
    format: () => '',
};

const testSetup: { params: ['left' | 'right', number]; result: string }[] = [
    { params: ['left', 0], result: '$10' },
    { params: ['left', 1], result: '$ 10' },
    { params: ['right', 0], result: '10$' },
    { params: ['right', 1], result: '10 $' },
];

testSetup.forEach(({ params, result }) => {
    it(`returns ${result} when params are ${params}`, () => {
        currency.format = getFormatCurrency(...params);
        expect(currency.format(10)).toBe(result);
    });
});
