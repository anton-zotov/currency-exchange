import React, { useState } from 'react';
import useExchangeRates from '../../hooks/useExchangeRates';
import ExchangeRates from '../../models/ExchangeRates';
import convertRate from '../../utils/ConvertRate';
import { formatAmount } from '../../utils/FormatAmount';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import Currency from '../../models/Currency';
import { Operation } from '../../models/Operation';
import CurrencySelection from '../CurrencySelection/CurrencySelection';
import { InputPair, OperationSwitchWrapper, OperationSwitch } from './style';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

// TODO: update exchange rate on currency change
// TODO: extract colors to file

type CurrencyInputConfig = {
    balance: number;
    currency: Currency;
    onCurrencyChange: (cur: Currency) => void;
    value: string;
    onValueChange: (val: string) => void;
};

type CurrencyInputPairProps = {
    from: CurrencyInputConfig;
    to: CurrencyInputConfig;
    operation: Operation;
    onOperationChange: () => void;
};

function CurrencyInputPair({
    from,
    to,
    operation,
    onOperationChange,
}: CurrencyInputPairProps) {
    const exchangeRates = useExchangeRates();
    const [inputBeingChanged, setInputBeingChanged] =
        useState<CurrencyInputConfig | null>(null);

    function handleValueChange(
        newValue: string,
        srcInput: CurrencyInputConfig,
        destInput: CurrencyInputConfig
    ) {
        const formattedSrcValue = formatAmount(newValue);
        srcInput.onValueChange(formattedSrcValue);

        if (newValue) {
            const convertedValue = convertRate(
                +formatAmount(newValue),
                srcInput.currency,
                destInput.currency,
                exchangeRates as ExchangeRates
            );
            const formattedDestValue = formatAmount(convertedValue);
            destInput.onValueChange(formattedDestValue);
        } else {
            destInput.onValueChange('');
        }
    }

    function handleFromValueChange(value: string): void {
        handleValueChange(value, from, to);
    }

    function handleToValueChange(value: string): void {
        handleValueChange(value, to, from);
    }

    function handleCurrencyClick(input: CurrencyInputConfig) {
        setInputBeingChanged(input);
    }

    function handleCurrencySelect(currency: Currency) {
        inputBeingChanged?.onCurrencyChange(currency);
        setInputBeingChanged(null);
    }

    return (
        <>
            <InputPair>
                <CurrencyInput
                    currency={from.currency}
                    balance={from.balance}
                    value={from.value}
                    sign={operation === Operation.Buy ? '+' : '-'}
                    onChange={handleFromValueChange}
                    onCurrencyClick={() => handleCurrencyClick(from)}
                ></CurrencyInput>
                <OperationSwitchWrapper>
                    <OperationSwitch onClick={() => onOperationChange()}>
                        {operation === Operation.Buy && <BsArrowUp />}
                        {operation === Operation.Sell && <BsArrowDown />}
                    </OperationSwitch>
                </OperationSwitchWrapper>
                <CurrencyInput
                    currency={to.currency}
                    balance={to.balance}
                    value={to.value}
                    sign={operation === Operation.Sell ? '+' : '-'}
                    onChange={handleToValueChange}
                    onCurrencyClick={() => handleCurrencyClick(to)}
                ></CurrencyInput>
            </InputPair>
            {inputBeingChanged && (
                <CurrencySelection
                    onClose={() => setInputBeingChanged(null)}
                    onSelect={handleCurrencySelect}
                ></CurrencySelection>
            )}
        </>
    );
}

export default CurrencyInputPair;
