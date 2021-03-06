import Currency from '../models/Currency';
import ExchangeRates from '../models/ExchangeRates';

export function convertRate(
    amount: number,
    from: Currency,
    to: Currency,
    exchangeRates: ExchangeRates
) {
    const amountUSD = amount / exchangeRates[from.code];
    return (amountUSD * exchangeRates[to.code]).toFixed(4);
}
