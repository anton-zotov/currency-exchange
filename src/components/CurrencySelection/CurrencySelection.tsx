import { useTranslation } from 'react-i18next';
import { IoMdArrowBack } from 'react-icons/io';
import { availableCurrencies } from '../../config';
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
};

function CurrencySelection({ onClose }: CurrencySelectionProps) {
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
        <Wrapper>
            <Header>
                <IconWrapper onClick={onClose}>
                    <IoMdArrowBack />
                </IconWrapper>
                {t('choose_source')}
            </Header>
            <div>
                <ul>{currencyItems}</ul>
            </div>
        </Wrapper>
    );
}

export default CurrencySelection;
