import React, { useState } from 'react';
import CurrencyInput from '../CurrencyInput';
import Currency from '../../models/Currency';
import Operation from '../../models/Operation';
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
    onActiveInputChange: (input: 'from' | 'to' | null) => void;
    onOperationChange: () => void;
};

function CurrencyInputPair({
    from,
    to,
    operation,
    onOperationChange,
    onActiveInputChange,
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

    function handleFocus(input: 'from' | 'to') {
        onActiveInputChange(input);
    }

    function handleBlur() {
        onActiveInputChange(null);
    }

    return (
        <>
            <InputPair role="region">
                <CurrencyInput
                    currency={from.currency}
                    balance={from.balance}
                    value={from.value}
                    sign={operation === Operation.Buy ? '+' : '-'}
                    onChange={value => from.onValueChange(value)}
                    onCurrencyClick={() => handleCurrencyClick(from)}
                    onFocus={() => handleFocus('from')}
                    onBlur={() => handleBlur()}
                ></CurrencyInput>
                <OperationSwitchWrapper>
                    <OperationSwitch
                        onClick={() => onOperationChange()}
                        data-testid="operation"
                    >
                        {operation === Operation.Buy && (
                            <BsArrowUp data-testid="arrow-up" />
                        )}
                        {operation === Operation.Sell && (
                            <BsArrowDown data-testid="arrow-down" />
                        )}
                    </OperationSwitch>
                </OperationSwitchWrapper>
                <CurrencyInput
                    currency={to.currency}
                    balance={to.balance}
                    value={to.value}
                    sign={operation === Operation.Sell ? '+' : '-'}
                    onChange={value => to.onValueChange(value)}
                    onCurrencyClick={() => handleCurrencyClick(to)}
                    onFocus={() => handleFocus('to')}
                    onBlur={() => handleBlur()}
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
