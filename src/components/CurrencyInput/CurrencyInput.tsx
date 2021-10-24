import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Currency from '../../models/Currency';
import { prettifyNumber, validateNumber } from '../../utils/NumberInput';
import {
    BottomLine,
    CurrencyCode,
    IconWrapper,
    Input,
    TopLine,
    Wrapper,
} from './style';

type CurrencyInputProps = {
    currency: Currency;
    balance: number;
    value: string;
    sign: string;
    onChange: (value: string) => void;
    onCurrencyClick: () => void;
};

function CurrencyInput({
    balance,
    currency,
    value,
    sign,
    onChange,
    onCurrencyClick,
}: CurrencyInputProps) {
    const { t } = useTranslation();

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
        <Wrapper>
            <TopLine>
                <CurrencyCode onClick={onCurrencyClick}>
                    {currency.code}
                    <IconWrapper>
                        <MdKeyboardArrowDown />
                    </IconWrapper>
                </CurrencyCode>
                <Input
                    value={value ? sign + value : value}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="0"
                />
            </TopLine>
            <BottomLine>
                {t('balance')}: {balance}
            </BottomLine>
        </Wrapper>
    );
}

export default CurrencyInput;
