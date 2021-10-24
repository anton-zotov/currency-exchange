import Currency from './models/Currency';
import { getFormatCurrency } from './utils/FormatCurrency';

export const openExchangeRatesAppId = '3cabd2c7471b4b778cd0de69c5470fae';

export const availableCurrencies: Currency[] = [
    {
        code: 'CZK',
        label: 'czech_koruna',
        symbol: 'Kč',
        format: getFormatCurrency('left', 1),
    },
    {
        code: 'EUR',
        label: 'euro',
        symbol: '€',
        format: getFormatCurrency('left', 0),
    },
    {
        code: 'PLN',
        label: 'poland_zloty',
        symbol: 'zł',
        format: getFormatCurrency('left', 1),
    },
    {
        code: 'USD',
        label: 'united_states_dollar',
        symbol: '$',
        format: getFormatCurrency('left', 0),
    },
];
