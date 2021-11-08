import Currency from './models/Currency';
import { getFormatCurrency } from './utils/FormatCurrency';

const openExchangeRatesAppId = '6014a0bc7c6d412eaa89c40f6a213a9d';
export const openExchangeRatesUrl = `https://openexchangerates.org/api/latest.json?app_id=${openExchangeRatesAppId}`;

export const availableCurrencies: Currency[] = [
    {
        code: 'CZK',
        label: 'czech_koruna',
        symbol: 'Kč',
        format: getFormatCurrency('left', 1),
    },
    {
        code: 'GBP',
        label: 'pound_sterling',
        symbol: '£',
        format: getFormatCurrency('left', 0),
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
