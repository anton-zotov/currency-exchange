import { useEffect, useState } from 'react';
import { openExchangeRatesUrl } from '../config';
import ExchangeRates from '../models/ExchangeRates';

function useExchangeRates(): [ExchangeRates | null, boolean] {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
        null
    );
    const [apiCallCount, setApiCallCount] = useState(1);
    const [areStale, setAreStale] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(
            () => setApiCallCount(count => count + 1),
            10000
        );
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetch(`${openExchangeRatesUrl}&random=${Math.random()}`)
            .then(res => res.json())
            .then(result => setExchangeRates(result.rates))
            .then(() => setAreStale(false))
            .catch(() => setAreStale(true));
    }, [apiCallCount]);

    return [exchangeRates, areStale];
}

export default useExchangeRates;
