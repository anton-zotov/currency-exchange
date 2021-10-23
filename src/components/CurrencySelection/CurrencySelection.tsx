import { useTranslation } from 'react-i18next';
import { IoMdArrowBack } from 'react-icons/io';
import { Page } from '../../common-styles/page';
import { availableCurrencies } from '../../config';
import Currency from '../../models/Currency';
import {
    CurrencyItem,
    Header,
    IconWrapper,
    Logo,
    LogoWrapper,
    Wrapper,
} from './style';

type CurrencySelectionProps = {
    onClose: () => void;
    onSelect: (currency: Currency) => void;
};

function CurrencySelection({ onClose, onSelect }: CurrencySelectionProps) {
    const { t } = useTranslation();
    const currencyItems = availableCurrencies.map((currency) => (
        <CurrencyItem key={currency.code} onClick={() => onSelect(currency)}>
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
        <Wrapper>
            <Page>
                <Header>
                    <IconWrapper onClick={onClose}>
                        <IoMdArrowBack />
                    </IconWrapper>
                    {t('choose_source')}
                </Header>
                <div>
                    <ul>{currencyItems}</ul>
                </div>
            </Page>
        </Wrapper>
    );
}

export default CurrencySelection;
