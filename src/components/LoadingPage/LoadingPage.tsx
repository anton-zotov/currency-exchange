import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import useExchangeRates from '../../hooks/useExchangeRates';
import { BalanceContext, ExchangeRatesContext } from '../../utils/Contexts';

type LoadingPageProps = {
    children?: React.ReactNode;
};

function LoadingPage({ children }: LoadingPageProps) {
    const [isBalanceLoading, getBalance, modifyBalance] = useBalance(
        availableCurrencies[0]
    );
    const exchangeRates = useExchangeRates();

    if (isBalanceLoading || !exchangeRates) {
        return <div>Loading...</div>;
    }

    return (
        <BalanceContext.Provider value={[getBalance, modifyBalance]}>
            <ExchangeRatesContext.Provider value={exchangeRates}>
                {children}
            </ExchangeRatesContext.Provider>
        </BalanceContext.Provider>
    );
}

export default LoadingPage;
