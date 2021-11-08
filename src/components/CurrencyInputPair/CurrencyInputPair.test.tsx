import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { availableCurrencies } from '../../config';
import i18n from '../../i18n';
import Operation from '../../models/Operation';
import CurrencyInputPair from './CurrencyInputPair';

let onFromCurrencyChange: jest.Mock;
let onFromValueChange: jest.Mock;
let onToCurrencyChange: jest.Mock;
let onToValueChange: jest.Mock;
let onOperationChange: jest.Mock;
let onActiveInputChange: jest.Mock;

function setup(operation: Operation) {
    render(
        <I18nextProvider i18n={i18n}>
            <CurrencyInputPair
                from={{
                    balance: 100,
                    currency: availableCurrencies[0],
                    value: '10',
                    onCurrencyChange: onFromCurrencyChange,
                    onValueChange: onFromValueChange,
                }}
                to={{
                    balance: 200,
                    currency: availableCurrencies[1],
                    value: '120',
                    onCurrencyChange: onToCurrencyChange,
                    onValueChange: onToValueChange,
                }}
                operation={operation}
                onOperationChange={onOperationChange}
                onActiveInputChange={onActiveInputChange}
            />
        </I18nextProvider>
    );
}

beforeEach(() => {
    onFromCurrencyChange = jest.fn();
    onFromValueChange = jest.fn();
    onToCurrencyChange = jest.fn();
    onToValueChange = jest.fn();
    onOperationChange = jest.fn();
    onActiveInputChange = jest.fn();
});

it('renders currency codes and balances', () => {
    setup(Operation.Buy);

    expect(screen.getByRole('region')).toHaveTextContent(
        `${availableCurrencies[0].code}Balance: 100${availableCurrencies[1].code}Balance: 200`
    );
});

it('sets proper signs', () => {
    setup(Operation.Buy);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('+10');
    expect(inputs[1]).toHaveValue('-120');
});

it('triggers onOperationChange', () => {
    setup(Operation.Buy);

    expect(onOperationChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('operation'));

    expect(onOperationChange).toHaveBeenCalled();
});

it('triggers onActiveInputChange on focus', () => {
    setup(Operation.Buy);

    expect(onActiveInputChange).not.toHaveBeenCalled();

    fireEvent.focus(screen.getAllByRole('textbox')[0]);

    expect(onActiveInputChange).toHaveBeenCalledWith('from');
});

it('triggers onActiveInputChange on blur', () => {
    setup(Operation.Buy);

    expect(onActiveInputChange).not.toHaveBeenCalled();

    fireEvent.blur(screen.getAllByRole('textbox')[0]);

    expect(onActiveInputChange).toHaveBeenCalledWith(null);
});

it('when operation is Buy renders arrow up', () => {
    setup(Operation.Buy);

    expect(screen.queryByTestId('arrow-up')).toBeTruthy();
    expect(screen.queryByTestId('arrow-down')).toBeNull();
});

it('when operation is Sell renders arrow down', () => {
    setup(Operation.Sell);

    expect(screen.queryByTestId('arrow-down')).toBeTruthy();
    expect(screen.queryByTestId('arrow-up')).toBeNull();
});

it('shows currency selection', () => {
    setup(Operation.Buy);

    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.queryByRole('dialog')).toBeTruthy();
});

it('triggers onCurrencyChange', () => {
    setup(Operation.Buy);

    expect(onFromCurrencyChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('listitem')[0]);

    expect(onFromCurrencyChange).toHaveBeenCalledWith(availableCurrencies[0]);
});

it('triggers onValueChange', () => {
    setup(Operation.Buy);

    expect(onFromValueChange).not.toHaveBeenCalled();

    fireEvent.change(screen.getAllByRole('textbox')[0], {
        target: { value: '123.45' },
    });

    expect(onFromValueChange).toHaveBeenCalledWith('123.45');
});
