import React from 'react';
import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import { BalanceContext, ExchangeRatesContext } from '../../utils/Contexts';
import LoadingPage from '../LoadingPage';

type DataProviderProps = {
    children?: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
    const [isBalanceLoading, getBalance, modifyBalance] = useBalance(
        availableCurrencies[0]
    );
    const exchangeRates = useExchangeRates();

    if (isBalanceLoading || !exchangeRates) {
        return <LoadingPage />;
    }

    return (
        <BalanceContext.Provider value={[getBalance, modifyBalance]}>
            <ExchangeRatesContext.Provider value={exchangeRates}>
                {children}
            </ExchangeRatesContext.Provider>
        </BalanceContext.Provider>
    );
}

export default DataProvider;
