import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '../../common-styles/page';
import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import ExchangeRates from '../../models/ExchangeRates';
import convertRate from '../../utils/ConvertRate';
import {
    BottomSection,
    ExchangeButton,
    ExchangeRate,
    IconWrapper,
    Layout,
    Title,
    TopSection,
} from './style';
import { Operation } from '../../models/Operation';
import CurrencyInputPair from '../CurrencyInputPair/CurrencyInputPair';
import { AiOutlineLineChart } from 'react-icons/ai';
import { useExchange } from '../../hooks/useExchange';

// TODO: update exchange rate on currency change
// TODO: add loading screen

function ExchangePage() {
    const { t } = useTranslation();
    const exchangeRates = useExchangeRates();
    const [operation, setOperation] = useState(Operation.Buy);

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    const [fromCurrency, setFromCurrency] = useState(availableCurrencies[1]);
    const [toCurrency, setToCurrency] = useState(availableCurrencies[0]);

    const buyingCurrency =
        operation === Operation.Buy ? fromCurrency : toCurrency;
    const sellingCurrency =
        operation === Operation.Sell ? fromCurrency : toCurrency;
    const commitExchange = useExchange(buyingCurrency, sellingCurrency);

    const [fromBalance] = useBalance(fromCurrency);
    const [toBalance] = useBalance(toCurrency);

    const isFromBalanceExceeded =
        operation === Operation.Sell && +fromValue > (fromBalance || 0);
    const isToBalanceExceeded =
        operation === Operation.Buy && +toValue > (toBalance || 0);
    const isBalanceExceeded = isFromBalanceExceeded || isToBalanceExceeded;

    function toggleOperation() {
        const newOperation =
            operation === Operation.Buy ? Operation.Sell : Operation.Buy;
        setOperation(newOperation);
    }

    function exchange() {
        commitExchange(+fromValue);
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
                <Layout>
                    <TopSection>
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
                        <CurrencyInputPair
                            from={{
                                balance: fromBalance,
                                currency: fromCurrency,
                                onCurrencyChange: setFromCurrency,
                                value: fromValue,
                                onValueChange: setFromValue,
                            }}
                            to={{
                                balance: toBalance,
                                currency: toCurrency,
                                onCurrencyChange: setToCurrency,
                                value: toValue,
                                onValueChange: setToValue,
                            }}
                            operation={operation}
                            onOperationChange={toggleOperation}
                        ></CurrencyInputPair>
                    </TopSection>
                    <BottomSection>
                        <ExchangeButton
                            disabled={isBalanceExceeded}
                            onClick={exchange}
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
            </Page>
        </>
    );
}

export default ExchangePage;
