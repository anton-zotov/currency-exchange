import { useEffect, useState } from 'react';
import { openExchangeRatesAppId } from '../config';
import ExchangeRates from '../models/ExchangeRates';

function useExchangeRates() {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
        null
    );

    useEffect(() => {
        fetch(
            `https://openexchangerates.org/api/latest.json?app_id=${openExchangeRatesAppId}`
        )
            .then((res) => res.json())
            .then((result) => setExchangeRates(result.rates));
    }, []);

    return exchangeRates;
}

export default useExchangeRates;
