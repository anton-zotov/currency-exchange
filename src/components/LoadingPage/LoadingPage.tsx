import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';
import { BalanceContext } from '../../utils/Contexts';

type LoadingPageProps = {
    children?: React.ReactNode;
};

function LoadingPage({ children }: LoadingPageProps) {
    const [isLoading, getBalance, modifyBalance] = useBalance(
        availableCurrencies[0]
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <BalanceContext.Provider value={[getBalance, modifyBalance]}>
            {children}
        </BalanceContext.Provider>
    );
}

export default LoadingPage;
