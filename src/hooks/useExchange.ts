import { useContext } from 'react';
import Currency from '../models/Currency';
import ExchangeRates from '../models/ExchangeRates';
import { BalanceContext, ExchangeRatesContext } from '../utils/Contexts';
import { convertRate } from '../utils/ConvertRate';

function useExchange(
    fromCurrency: Currency,
    toCurrency: Currency
): (amount: number) => void {
    const exchangeRates = useContext(ExchangeRatesContext);
    const [getBalance, modifyBalance] = useContext(BalanceContext);

    return (buyAmount: number) => {
        const buyAmountRounded = Math.round(buyAmount * 100);
        const sellAmountRounded = Math.round(
            +convertRate(
                buyAmountRounded,
                fromCurrency,
                toCurrency,
                exchangeRates as ExchangeRates
            )
        );

        modifyBalance(buyAmountRounded, fromCurrency);
        modifyBalance(-sellAmountRounded, toCurrency);
    };
}

export default useExchange;
