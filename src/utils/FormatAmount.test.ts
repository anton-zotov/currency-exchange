import { formatAmount } from './FormatAmount';
import { TestCase, testResults } from './TestHelper';

const testCases: TestCase[] = [
    { params: [''], result: '' },
    { params: ['0'], result: '0' },
    { params: ['123'], result: '123' },
    { params: ['123.'], result: '123.' },
    { params: ['123.0'], result: '123.0' },
    { params: ['123.00'], result: '123.00' },
    { params: ['123.4'], result: '123.4' },
    { params: ['123.45'], result: '123.45' },
    { params: ['123.456'], result: '123.45' },

    { params: ['', true], result: '' },
    { params: ['0', true], result: '0' },
    { params: ['123', true], result: '123' },
    { params: ['123.', true], result: '123' },
    { params: ['123.0', true], result: '123' },
    { params: ['123.00', true], result: '123' },
    { params: ['123.4', true], result: '123.4' },
    { params: ['123.45', true], result: '123.45' },
    { params: ['123.456', true], result: '123.45' },
];

testResults(testCases, formatAmount);
