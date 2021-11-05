import Currency from '../models/Currency';
import ExchangeRates from '../models/ExchangeRates';
import convertRate from '../utils/ConvertRate';
import useBalance from './useBalance';
import useExchangeRates from './useExchangeRates';

export function useExchange(
    fromCurrency: Currency,
    toCurrency: Currency
): (amount: number) => void {
    const [fromBalance, modifyFromBalance] = useBalance(fromCurrency);
    const [toBalance, modifyToBalance] = useBalance(toCurrency);
    const exchangeRates = useExchangeRates();

    return (buyAmount: number) => {
        const sellAmount = +convertRate(
            buyAmount,
            fromCurrency,
            toCurrency,
            exchangeRates as ExchangeRates
        );

        modifyFromBalance(buyAmount, fromCurrency);
        modifyToBalance(-sellAmount, toCurrency);
    };
}
