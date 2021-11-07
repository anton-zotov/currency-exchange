import React from 'react';
import Currency from '../models/Currency';
import ExchangeRates from '../models/ExchangeRates';

export const BalanceContext = React.createContext<
    [
        (currency: Currency) => number | null,
        (amount: number, currency: Currency) => void
    ]
>([(c: Currency) => null, (amount: number, currency: Currency) => {}]);

export const ExchangeRatesContext = React.createContext<ExchangeRates>({});
