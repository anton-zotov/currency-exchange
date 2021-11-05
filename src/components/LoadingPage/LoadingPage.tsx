import { availableCurrencies } from '../../config';
import useBalance from '../../hooks/useBalance';

type LoadingPageProps = {
    children?: React.ReactNode;
};

function LoadingPage({ children }: LoadingPageProps) {
    const [balance] = useBalance(availableCurrencies[0]);

    if (!balance) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default LoadingPage;
