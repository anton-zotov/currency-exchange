import React, { useState } from 'react';
import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import CurrencyInput from '../CurrencyInput/CurrencyInput';

function ExchangePage() {
    let operation: 'buy' | 'sell' = 'sell';
    const exchangeRates = useExchangeRates();

    const [fromCurrency, setFromCurrency] = useState(availableCurrencies[1]);
    const [toCurrency, setToCurrency] = useState(availableCurrencies[0]);

    const fromBalance = useBalance(fromCurrency);
    const toBalance = useBalance(toCurrency);

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    if (!exchangeRates || !fromBalance || !toBalance) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <h1>{operation} PLN</h1>
            <div>
                {fromCurrency.format(1)} ={' '}
                {toCurrency.format(exchangeRates.PLN)}
            </div>
            <CurrencyInput
                currency={fromCurrency}
                balance={fromBalance}
                value={fromValue}
                onChange={setFromValue}
            ></CurrencyInput>
            <CurrencyInput
                currency={toCurrency}
                balance={toBalance}
                value={toValue}
                onChange={setToValue}
            ></CurrencyInput>
        </div>
    );
}

export default ExchangePage;