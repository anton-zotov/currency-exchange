import Currency from '../models/Currency';
import ExchangeRates from '../models/ExchangeRates';
import convertRate from '../utils/ConvertRate';
import useExchangeRates from './useExchangeRates';

export function useExchange(
    fromCurrency: Currency,
    toCurrency: Currency,
    modifyBalance: (amount: number, currency: Currency) => void
): (amount: number) => void {
    const exchangeRates = useExchangeRates();

    return (buyAmount: number) => {
        const sellAmount = +convertRate(
            buyAmount,
            fromCurrency,
            toCurrency,
            exchangeRates as ExchangeRates
        );

        modifyBalance(buyAmount, fromCurrency);
        modifyBalance(-sellAmount, toCurrency);
    };
}
