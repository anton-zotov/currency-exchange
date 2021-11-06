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
