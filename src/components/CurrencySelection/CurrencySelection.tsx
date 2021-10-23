import { useTranslation } from 'react-i18next';
import { availableCurrencies } from '../../config';
import { CurrencyItem, Logo, LogoWrapper } from './style';

function CurrencySelection() {
    const { t } = useTranslation();
    const currencyItems = availableCurrencies.map((currency) => (
        <CurrencyItem key={currency.code}>
            <LogoWrapper>
                <Logo src={`/img/${currency.code.toLowerCase()}.svg`} />
            </LogoWrapper>
            <div>
                <div>{t(`currency.${currency.label}`)}</div>
                <div>{currency.code}</div>
            </div>
        </CurrencyItem>
    ));

    return (
        <div>
            <div>{t('choose_source')}</div>
            <div>
                <ul>{currencyItems}</ul>
            </div>
        </div>
    );
}

export default CurrencySelection;
