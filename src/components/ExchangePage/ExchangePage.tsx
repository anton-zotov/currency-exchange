import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '../../common-styles/page';
import { availableCurrencies } from '../../config';
import ExchangeRates from '../../models/ExchangeRates';
import { convertRate } from '../../utils/ConvertRate';
import {
    BottomSection,
    ErrorNotification,
    ExchangeButton,
    ExchangeRate,
    IconWrapper,
    Layout,
    Title,
    TopSection,
    Wrapper,
} from './style';
import Operation from '../../models/Operation';
import CurrencyInputPair from '../CurrencyInputPair';
import { AiOutlineLineChart } from 'react-icons/ai';
import useExchange from '../../hooks/useExchange';
import { useContext } from 'react';
import { BalanceContext, ExchangeRatesContext } from '../../utils/Contexts';
import SuccessfulExchangeNotification from '../SuccessfulExchangeNotification';
import Currency from '../../models/Currency';
import { formatAmount } from '../../utils/FormatAmount';
import { useEffect } from 'react';

function ExchangePage() {
    const { t } = useTranslation();
    const [operation, setOperation] = useState(Operation.Buy);
    const [isSuccessNotificationOpen, setIsSuccessNotificationOpen] =
        useState(false);
    const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);
    const [exchangeRates, areRatesStale] = useContext(ExchangeRatesContext);

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    let [fromCurrency, setFromCurrency] = useState(availableCurrencies[1]);
    let [toCurrency, setToCurrency] = useState(availableCurrencies[2]);

    const [getBalance] = useContext(BalanceContext);
    const fromBalance = getBalance(fromCurrency);
    const toBalance = getBalance(toCurrency);

    const buyingCurrency =
        operation === Operation.Buy ? fromCurrency : toCurrency;
    const sellingCurrency =
        operation === Operation.Sell ? fromCurrency : toCurrency;
    const buyingAmount = operation === Operation.Buy ? fromValue : toValue;
    const sellingAmount = operation === Operation.Sell ? fromValue : toValue;
    const commitExchange = useExchange(buyingCurrency, sellingCurrency);

    useEffect(() => {
        if (
            activeInput === 'from' ||
            (!activeInput && operation === Operation.Buy)
        ) {
            updateFromValue(fromValue); //trigger rate recalculation
        } else {
            updateToValue(toValue); //trigger rate recalculation
        }
    }, [exchangeRates, fromCurrency, toCurrency]);

    const isFromBalanceExceeded =
        operation === Operation.Sell && +fromValue > (fromBalance || 0);
    const isToBalanceExceeded =
        operation === Operation.Buy && +toValue > (toBalance || 0);
    const isBalanceExceeded = isFromBalanceExceeded || isToBalanceExceeded;

    const isExchangeButtonDisabled =
        isBalanceExceeded || !fromValue || areRatesStale;

    function toggleOperation() {
        const newOperation =
            operation === Operation.Buy ? Operation.Sell : Operation.Buy;
        setOperation(newOperation);
    }

    function exchange() {
        commitExchange(+buyingAmount);
        setIsSuccessNotificationOpen(true);
    }

    function getUpdateValueFn(sourceInput: 'from' | 'to') {
        return (newValue: string) => {
            const srcCurrency =
                sourceInput === 'from' ? fromCurrency : toCurrency;
            const setSrcValue =
                sourceInput === 'from' ? setFromValue : setToValue;

            const destCurrency =
                sourceInput === 'from' ? toCurrency : fromCurrency;
            const setDestValue =
                sourceInput === 'from' ? setToValue : setFromValue;

            const formattedSrcValue = formatAmount(newValue);
            setSrcValue(formattedSrcValue);

            if (newValue) {
                const convertedValue = convertRate(
                    +formatAmount(newValue),
                    srcCurrency,
                    destCurrency,
                    exchangeRates as ExchangeRates
                );
                const formattedDestValue = formatAmount(
                    (+convertedValue).toFixed(2),
                    true
                );
                setDestValue(formattedDestValue);
            } else {
                setDestValue('');
            }
        };
    }
    const updateFromValue = getUpdateValueFn('from');
    const updateToValue = getUpdateValueFn('to');

    function swapCurrencies() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        [fromCurrency, toCurrency] = [toCurrency, fromCurrency];
    }

    function updateFromCurrency(currency: Currency) {
        currency === toCurrency ? swapCurrencies() : setFromCurrency(currency);
    }

    function updateToCurrency(currency: Currency) {
        currency === fromCurrency ? swapCurrencies() : setToCurrency(currency);
    }

    if (fromBalance === null || toBalance === null) return <div></div>;

    const priceForOneUnit = convertRate(
        1,
        fromCurrency,
        toCurrency,
        exchangeRates as ExchangeRates
    );

    return (
        <>
            <Page>
                <Wrapper>
                    {areRatesStale && (
                        <ErrorNotification
                            role="alert"
                            data-testid="stale-rates-notification"
                        >
                            {t('stale_rates_notification')}
                        </ErrorNotification>
                    )}
                    <Layout>
                        <TopSection>
                            <Title>
                                {t(operation)} {fromCurrency.code}
                            </Title>
                            <ExchangeRate data-testid="exchange-rate">
                                <IconWrapper>
                                    <AiOutlineLineChart />
                                </IconWrapper>
                                {fromCurrency.format(1)} ={' '}
                                {toCurrency.format(priceForOneUnit)}
                            </ExchangeRate>
                            <CurrencyInputPair
                                from={{
                                    balance: fromBalance,
                                    currency: fromCurrency,
                                    onCurrencyChange: updateFromCurrency,
                                    value: fromValue,
                                    onValueChange: updateFromValue,
                                }}
                                to={{
                                    balance: toBalance,
                                    currency: toCurrency,
                                    onCurrencyChange: updateToCurrency,
                                    value: toValue,
                                    onValueChange: updateToValue,
                                }}
                                operation={operation}
                                onActiveInputChange={setActiveInput}
                                onOperationChange={toggleOperation}
                            ></CurrencyInputPair>
                        </TopSection>
                        <BottomSection>
                            <ExchangeButton
                                disabled={isExchangeButtonDisabled}
                                onClick={exchange}
                                data-testid="exchange-button"
                            >
                                {t(
                                    operation === Operation.Buy
                                        ? 'buy_with'
                                        : 'sell_to',
                                    {
                                        curOne: fromCurrency.code,
                                        curTwo: toCurrency.code,
                                    }
                                )}
                            </ExchangeButton>
                        </BottomSection>
                    </Layout>
                </Wrapper>
            </Page>
            {isSuccessNotificationOpen && (
                <SuccessfulExchangeNotification
                    fromCurrency={sellingCurrency}
                    fromAmount={sellingAmount}
                    toCurrency={buyingCurrency}
                    toAmount={buyingAmount}
                    onClose={() => setIsSuccessNotificationOpen(false)}
                />
            )}
        </>
    );
}

export default ExchangePage;
