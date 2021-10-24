import { TFunction } from 'i18next';
import Currency from '../models/Currency';
import { filterCurrenciesPredicate } from './FilterCurrencies';
import { TestCase, testResults } from './TestHelper';

const tMock: TFunction = (s: string) => s;
const currencies = [
    { code: 'CZK', label: 'czech_koruna' },
    { code: 'EUR', label: 'euro' },
    { code: 'PLN', label: 'poland_zloty' },
] as Currency[];

const testCases: TestCase[] = [
    { params: [''], result: currencies },
    { params: ['CZK'], result: [currencies[0]] },
    { params: ['euro'], result: [currencies[1]] },
    { params: ['e'], result: [currencies[0], currencies[1]] },
    { params: ['none'], result: [] },
];

testResults(testCases, (query: string) => {
    const predicate = filterCurrenciesPredicate(query, tMock);
    return currencies.filter(predicate);
});
