import React, { useState } from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import Currency from '../../models/Currency';
import { Operation } from '../../models/Operation';
import CurrencySelection from '../CurrencySelection';
import { InputPair, OperationSwitchWrapper, OperationSwitch } from './style';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

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
    const [inputBeingChanged, setInputBeingChanged] =
        useState<CurrencyInputConfig | null>(null);

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
                    onChange={(value) => from.onValueChange(value)}
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
                    onChange={(value) => to.onValueChange(value)}
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
