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

// TODO: update exchange rate on currency change

enum Operation {
    Buy = 'buy',
    Sell = 'sell',
}

function ExchangePage() {
    const { t } = useTranslation();
    const exchangeRates = useExchangeRates();
    const [operation, setOperation] = useState(Operation.Buy);

    const [fromCurrency, setFromCurrency] = useState(availableCurrencies[1]);
    const [toCurrency, setToCurrency] = useState(availableCurrencies[0]);
    const [changeCurrencyFn, setChangeCurrencyFn] = useState<
        typeof setFromCurrency | null
    >(null);

    const fromBalance = useBalance(fromCurrency);
    const toBalance = useBalance(toCurrency);

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    function handleFromValueChange(newValue: string) {
        const formattedFromValue = formatAmount(newValue);
        setFromValue(formattedFromValue);

        if (newValue) {
            const convertedValue = convertRate(
                +formatAmount(newValue),
                fromCurrency,
                toCurrency,
                exchangeRates as ExchangeRates
            );
            const formattedToValue = formatAmount(convertedValue);
            setToValue(formattedToValue);
        } else {
            setToValue('');
        }
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

    const priceForOneUnit = convertRate(
        1,
        fromCurrency,
        toCurrency,
        exchangeRates as ExchangeRates
    );

    return (
        <>
            <Page>
                <Title>
                    {t(operation)} {fromCurrency.code}
                </Title>
                <ExchangeRate>
                    <IconWrapper>
                        <AiOutlineLineChart />
                    </IconWrapper>
                    {fromCurrency.format(1)} ={' '}
                    {toCurrency.format(priceForOneUnit)}
                </ExchangeRate>
                <CurrencyInput
                    currency={fromCurrency}
                    balance={fromBalance}
                    value={fromValue}
                    sign={operation === Operation.Buy ? '+' : '-'}
                    onChange={handleFromValueChange}
                    onCurrencyClick={() => handleCurrencyClick(setFromCurrency)}
                ></CurrencyInput>
                <CurrencyInput
                    currency={toCurrency}
                    balance={toBalance}
                    value={toValue}
                    sign={operation === Operation.Sell ? '+' : '-'}
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
