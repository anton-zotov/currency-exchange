import React from 'react';
import Currency from '../models/Currency';

export const BalanceContext = React.createContext<
    [
        (currency: Currency) => number | null,
        (amount: number, currency: Currency) => void
    ]
>([(c: Currency) => null, (amount: number, currency: Currency) => {}]);
