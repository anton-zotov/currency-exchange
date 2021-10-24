import ExchangeRates from '../models/ExchangeRates';
import convertRate from './ConvertRate';
import { TestCase, testResults } from './TestHelper';

const exchangeRates: ExchangeRates = {
    EUR: 1.15,
    PLN: 3.9,
};

const testCases: TestCase[] = [
    {
        params: [1.23, { code: 'EUR' }, { code: 'PLN' }, exchangeRates],
        result: '4.1713',
    },
    {
        params: [100, { code: 'PLN' }, { code: 'EUR' }, exchangeRates],
        result: '29.4872',
    },
];

testResults(testCases, convertRate);
