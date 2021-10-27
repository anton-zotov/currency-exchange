import { useEffect, useState } from 'react';
import { openExchangeRatesAppId } from '../config';
import ExchangeRates from '../models/ExchangeRates';

const mockRates = {
    EUR: 0.9,
    USD: 1,
    PLN: 3.9,
    CZK: 19,
};

function useExchangeRates() {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
        null
    );

    useEffect(() => {
        setExchangeRates(mockRates);
        // fetch(
        //     `https://openexchangerates.org/api/latest.json?app_id=${openExchangeRatesAppId}`
        // )
        //     .then((res) => res.json())
        //     .then((result) => setExchangeRates(result.rates));
    }, []);

    return exchangeRates;
}

export default useExchangeRates;
