import { useEffect, useState } from 'react';
import { openExchangeRatesAppId } from '../config';
import ExchangeRates from '../models/ExchangeRates';

// TODO: remove me
let mockRates = {
    EUR: 0.9,
    USD: 1,
    PLN: 3.9,
    CZK: 19,
    GBP: 1.14,
} as any;

function useExchangeRates() {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
        null
    );
    const [apiCallCount, setApiCallCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(
            () => setApiCallCount(count => count + 1),
            3000
        );
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // TODO: remove me
        for (let k in mockRates) {
            mockRates[k] = Math.random() * 50;
        }
        mockRates = { ...mockRates };
        setExchangeRates(mockRates);
        // TODO: add error processing
        // fetch(
        //     `https://openexchangerates.org/api/latest.json?app_id=${openExchangeRatesAppId}`
        // )
        //     .then(res => res.json())
        //     .then(result => setExchangeRates(result.rates));
    }, [apiCallCount]);

    return exchangeRates;
}

export default useExchangeRates;
