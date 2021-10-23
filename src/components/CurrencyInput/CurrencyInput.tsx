import { useTranslation } from 'react-i18next';
import Currency from '../../models/Currency';
import { BottomLine, Input, TopLine, Wrapper } from './style';

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
                <span>{currency.code}</span>
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
