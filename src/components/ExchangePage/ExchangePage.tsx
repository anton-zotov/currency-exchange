import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineLineChart } from 'react-icons/ai';
import { Page } from '../../common-styles/page';
import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import Currency from '../../models/Currency';
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

    const [fromCurrency, setFromCurrency] = useState(availableCurrencies[1]);
    const [toCurrency, setToCurrency] = useState(availableCurrencies[0]);
    const [changeCurrencyFn, setChangeCurrencyFn] = useState<
        typeof setFromCurrency | null
    >(null);

    console.log('fromCurrency', fromCurrency);
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

    function handleCurrencyClick(changeCurrencyFn: typeof setFromCurrency) {
        setChangeCurrencyFn(() => changeCurrencyFn);
    }

    function handleCurrencySelect(currency: Currency) {
        changeCurrencyFn?.(currency);
        setChangeCurrencyFn(null);
    }

    if (!exchangeRates || !fromBalance || !toBalance) {
        return <div>Loading</div>;
    }

    return (
        <>
            <Page>
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
                    onCurrencyClick={() => handleCurrencyClick(setFromCurrency)}
                ></CurrencyInput>
                <CurrencyInput
                    currency={toCurrency}
                    balance={toBalance}
                    value={toValue}
                    onChange={setToValue}
                    onCurrencyClick={() => handleCurrencyClick(setToCurrency)}
                ></CurrencyInput>
            </Page>
            {changeCurrencyFn && (
                <CurrencySelection
                    onClose={() => setChangeCurrencyFn(null)}
                    onSelect={handleCurrencySelect}
                ></CurrencySelection>
            )}
        </>
    );
}

export default ExchangePage;
