import { formatAmount } from './FormatAmount';
import { TestCase, testResults } from './TestHelper';

const testCases: TestCase[] = [
    { params: [''], result: '' },
    { params: ['0'], result: '0' },
    { params: ['123'], result: '123' },
    { params: ['123.'], result: '123.' },
    { params: ['123.4'], result: '123.4' },
    { params: ['123.45'], result: '123.45' },
    { params: ['123.456'], result: '123.45' },
];

testResults(testCases, formatAmount);
