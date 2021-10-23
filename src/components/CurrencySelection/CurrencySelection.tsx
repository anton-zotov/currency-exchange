import { availableCurrencies } from '../../config';
import { CurrencyItem, Logo, LogoWrapper } from './style';

function CurrencySelectionPage() {
    const currencyItems = availableCurrencies.map((currency) => (
        <CurrencyItem key={currency.code}>
            <LogoWrapper>
                <Logo src={`/img/${currency.code.toLowerCase()}.svg`} />
            </LogoWrapper>
            <div>
                <div>{currency.label}</div>
                <div>{currency.code}</div>
            </div>
        </CurrencyItem>
    ));

    return (
        <div>
            <div>Choose source</div>
            <div>
                <ul>{currencyItems}</ul>
            </div>
        </div>
    );
}

export default CurrencySelectionPage;
