import Currency from './models/Currency';
import { getFormatCurrency } from './utils/FormatCurrency';

export const openExchangeRatesAppId = '3cabd2c7471b4b778cd0de69c5470fae';

export const availableCurrencies: Currency[] = [
    {
        code: 'CZK',
        label: 'Czech Koruna',
        symbol: 'Kč',
        format: getFormatCurrency('left', 1),
    },
    {
        code: 'EUR',
        label: 'Euro',
        symbol: '€',
        format: getFormatCurrency('left', 0),
    },
    {
        code: 'PLN',
        label: 'Poland Złoty',
        symbol: 'zł',
        format: getFormatCurrency('left', 1),
    },
    {
        code: 'USD',
        label: 'United States Dollar',
        symbol: '$',
        format: getFormatCurrency('left', 0),
    },
];
