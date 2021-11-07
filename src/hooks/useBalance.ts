import { useEffect, useState } from 'react';
import { availableCurrencies } from '../config';
import Balance from '../models/Balance';
import Currency from '../models/Currency';

function useBalance(
    currency: Currency
): [
    boolean,
    (currency: Currency) => number | null,
    (amount: number, currency: Currency) => void
] {
    const [balance, setBalance] = useState<Balance | null>(null);

    useEffect(() => {
        const newBalance: Balance = availableCurrencies.reduce(
            (acc, currency) => ({
                ...acc,
                [currency.code]: Math.floor(Math.random() * 100000),
            }),
            {}
        );
        setBalance(newBalance);
    }, []);

    function modifyBalance(amount: number, currency: Currency) {
        setBalance(balance => {
            if (!balance || balance[currency.code] === null) {
                throw new Error('balance is null');
            }

            return {
                ...balance,
                [currency.code]: balance[currency.code] + amount,
            };
        });
    }

    const getBalance = (currency: Currency) =>
        balance?.[currency.code] ? balance[currency.code] / 100 : null;

    return [!balance, getBalance, modifyBalance];
}

export default useBalance;
