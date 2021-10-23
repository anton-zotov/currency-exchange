import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineLineChart } from 'react-icons/ai';
import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import ExchangeRates from '../../models/ExchangeRates';
import convertRate from '../../utils/ConvertRate';
import { formatAmount } from '../../utils/FormatAmount';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import CurrencySelection from '../CurrencySelection/CurrencySelection';
import { ExchangeRate, IconWrapper, Title } from './style';

function ExchangePage() {
    let operation: 'buy' | 'sell' = 'sell';
    const { t } = useTranslation();
    const exchangeRates = useExchangeRates();
    const [isCurrencySelectionOpen, setIsCurrencySelectionOpen] =
        useState(false);

    const [fromCurrency, setFromCurrency] = useState(availableCurrencies[1]);
    const [toCurrency, setToCurrency] = useState(availableCurrencies[0]);

    const fromBalance = useBalance(fromCurrency);
    const toBalance = useBalance(toCurrency);

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    function handleFromValueChange(newValue: string) {
        const formattedFromValue = formatAmount(newValue);
        const convertedValue = convertRate(
            +formatAmount(newValue),
            fromCurrency,
            toCurrency,
            exchangeRates as ExchangeRates
        );
        const formattedToValue = formatAmount(convertedValue);

        setFromValue(formattedFromValue);
        setToValue(formattedToValue);
    }

    function handleCurrencyClick() {
        setIsCurrencySelectionOpen(true);
    }

    if (!exchangeRates || !fromBalance || !toBalance) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <Title>{t(operation)} PLN</Title>
            <ExchangeRate>
                <IconWrapper>
                    <AiOutlineLineChart />
                </IconWrapper>
                {fromCurrency.format(1)} ={' '}
                {toCurrency.format(exchangeRates.PLN)}
            </ExchangeRate>
            <CurrencyInput
                currency={fromCurrency}
                balance={fromBalance}
                value={fromValue}
                onChange={handleFromValueChange}
                onCurrencyClick={handleCurrencyClick}
            ></CurrencyInput>
            <CurrencyInput
                currency={toCurrency}
                balance={toBalance}
                value={toValue}
                onChange={setToValue}
                onCurrencyClick={handleCurrencyClick}
            ></CurrencyInput>

            {isCurrencySelectionOpen && (
                <CurrencySelection
                    onClose={() => setIsCurrencySelectionOpen(false)}
                ></CurrencySelection>
            )}
        </div>
    );
}

export default ExchangePage;
