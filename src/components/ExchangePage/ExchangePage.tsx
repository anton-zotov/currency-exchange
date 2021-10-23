import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import { GrLineChart } from 'react-icons/gr';
import { AiOutlineLineChart } from 'react-icons/ai';
import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import ExchangeRates from '../../models/ExchangeRates';
import convertRate from '../../utils/ConvertRate';
import { formatAmount } from '../../utils/FormatAmount';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import { ExchangeRate, IconContainer, Title } from './style';

function ExchangePage() {
    let operation: 'buy' | 'sell' = 'sell';
    const { t } = useTranslation();
    const exchangeRates = useExchangeRates();

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

    if (!exchangeRates || !fromBalance || !toBalance) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <Title>{t(operation)} PLN</Title>
            <ExchangeRate>
                <IconContainer>
                    <AiOutlineLineChart />
                </IconContainer>
                {fromCurrency.format(1)} ={' '}
                {toCurrency.format(exchangeRates.PLN)}
            </ExchangeRate>
            <CurrencyInput
                currency={fromCurrency}
                balance={fromBalance}
                value={fromValue}
                onChange={handleFromValueChange}
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
