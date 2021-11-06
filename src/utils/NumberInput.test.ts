import { prettifyNumber, validateNumber } from './NumberInput';
import { TestCase, testResults } from './TestHelper';

const validateNumberTestCases: TestCase[] = [
    { params: [''], result: true },
    { params: ['0'], result: true },
    { params: ['1'], result: true },
    { params: ['1.'], result: true },
    { params: ['1.2'], result: true },
    { params: ['1.23'], result: true },

    { params: ['-'], result: false },
    { params: ['1a'], result: false },
    { params: ['1a2'], result: false },
    { params: ['1..'], result: false },
    { params: ['1..3'], result: false },
];
testResults(validateNumberTestCases, validateNumber);

const prettifyNumberTestCases: TestCase[] = [
    { params: [''], result: '' },
    { params: ['0'], result: '0' },
    { params: ['00'], result: '0' },
    { params: ['01'], result: '1' },
    { params: ['.'], result: '0.' },
    { params: ['0.12'], result: '0.12' },
];
testResults(prettifyNumberTestCases, prettifyNumber);
