import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import { Page } from '../../common-styles/page';
import { availableCurrencies } from '../../config';
import Currency from '../../models/Currency';
import { BalanceContext } from '../../utils/Contexts';
import { filterCurrenciesPredicate } from '../../utils/FilterCurrencies';
import {
    CurrencyItem,
    CurrencyLabel,
    Header,
    IconWrapper,
    Logo,
    LogoWrapper,
    Seach,
    SeachLabel,
    Wrapper,
} from './style';

type CurrencySelectionProps = {
    onClose: () => void;
    onSelect: (currency: Currency) => void;
};

function CurrencySelection({ onClose, onSelect }: CurrencySelectionProps) {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(true);
    const [getBalance] = useContext(BalanceContext);

    function handleBlur() {
        setIsSearchFocused(false);

        // delay to avoid briefly showing the full list on currency select
        setTimeout(() => {
            setQuery('');
        }, 100);
    }

    const currencyItems = availableCurrencies
        .filter(filterCurrenciesPredicate(query, t))
        .map(currency => (
            <CurrencyItem
                key={currency.code}
                onClick={() => onSelect(currency)}
            >
                <LogoWrapper>
                    <Logo src={`/img/${currency.code.toLowerCase()}.svg`} />
                </LogoWrapper>
                <div>
                    <div>
                        {currency.code} · {getBalance(currency)}
                    </div>
                    <CurrencyLabel>
                        {t(`currency.${currency.label}`)}
                    </CurrencyLabel>
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
                    {!isSearchFocused && (
                        <SeachLabel>
                            {t('choose_source')}
                            <IconWrapper>
                                <AiOutlineSearch
                                    onClick={() => setIsSearchFocused(true)}
                                />
                            </IconWrapper>
                        </SeachLabel>
                    )}
                    {isSearchFocused && (
                        <Seach
                            value={query}
                            onBlur={handleBlur}
                            onChange={e => setQuery(e.target.value)}
                            autoFocus={true}
                        ></Seach>
                    )}
                </Header>
                <div>
                    <ul>{currencyItems}</ul>
                </div>
            </Page>
        </Wrapper>
    );
}

export default CurrencySelection;
