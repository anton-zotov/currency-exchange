import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Currency from '../../models/Currency';
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
    onChange: (value: string) => void;
};

function CurrencyInput({
    balance,
    currency,
    value,
    onChange,
}: CurrencyInputProps) {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <TopLine>
                <CurrencyCode>
                    {currency.code}
                    <IconWrapper>
                        <MdKeyboardArrowDown />
                    </IconWrapper>
                </CurrencyCode>
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="number"
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
