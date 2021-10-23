import { useEffect, useState } from 'react';
import { availableCurrencies } from '../config';
import Balance from '../models/Balance';
import Currency from '../models/Currency';

function useBalance(currency: Currency): number | null {
    const [balance, setBalance] = useState<Balance | null>(null);

    useEffect(() => {
        const balance = availableCurrencies.reduce(
            (acc, currency) => ({
                ...acc,
                [currency.code]: Math.floor(Math.random() * 100000) / 100,
            }),
            {}
        );
        setBalance(balance);
    }, []);

    return balance ? balance[currency.code] : null;
}

export default useBalance;
