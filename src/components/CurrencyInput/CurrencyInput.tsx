import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Currency from '../../models/Currency';
import { prettifyNumber, validateNumber } from '../../utils/NumberInput';
import {
    BottomLine,
    CurrencyCode,
    Error,
    IconWrapper,
    Input,
    TopLine,
    Wrapper,
} from './style';

type CurrencyInputProps = {
    balance: number;
    currency: Currency;
    sign: string;
    value: string;
    onChange: (value: string) => void;
    onCurrencyClick: () => void;
    onFocus: () => void;
    onBlur: () => void;
};

function CurrencyInput({
    currency,
    balance,
    sign,
    value,
    onChange,
    onCurrencyClick,
    onFocus,
    onBlur,
}: CurrencyInputProps) {
    const { t } = useTranslation();
    const isBalanceExceeded = sign === '-' && +value > balance;

    function removeSign(s: string) {
        if (s.startsWith('-') || s.startsWith('+')) {
            return s.slice(1);
        }
        return s;
    }

    function handleChange(val: string) {
        let valWithoutSign = removeSign(val);
        if (!validateNumber(valWithoutSign)) {
            return;
        }
        onChange(prettifyNumber(valWithoutSign));
    }

    return (
        <Wrapper hasError={isBalanceExceeded} role="group">
            <TopLine>
                <CurrencyCode onClick={onCurrencyClick} data-testid="change-currency-button">
                    {currency.code}
                    <IconWrapper>
                        <MdKeyboardArrowDown />
                    </IconWrapper>
                </CurrencyCode>
                <Input
                    value={value ? sign + value : value}
                    onChange={e => handleChange(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    inputMode="numeric"
                    maxLength={13}
                    placeholder="0"
                />
            </TopLine>
            <BottomLine>
                <span data-testid="balance">
                    {t('balance')}: {balance}
                </span>
                {isBalanceExceeded && (
                    <Error role="alert">{t('exceed_balance')}</Error>
                )}
            </BottomLine>
        </Wrapper>
    );
}

export default CurrencyInput;
