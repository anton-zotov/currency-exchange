import Currency from '../models/Currency';
import { getFormatCurrency } from './FormatCurrency';
import { TestCase, testResults } from './TestHelper';

const currency: Currency = {
    code: 'USD',
    label: 'United States Dollar',
    symbol: '$',
    format: () => '',
};

const testCases: TestCase[] = [
    { params: ['left', 0], result: '$10' },
    { params: ['left', 1], result: '$ 10' },
    { params: ['right', 0], result: '10$' },
    { params: ['right', 1], result: '10 $' },
];

testResults(testCases, (symbolPos, spaces) => {
    currency.format = getFormatCurrency(symbolPos, spaces);
    return currency.format(10);
});
