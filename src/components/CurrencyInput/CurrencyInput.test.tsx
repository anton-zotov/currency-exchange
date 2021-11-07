import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Colors } from '../../common-styles/colors';
import { availableCurrencies } from '../../config';
import i18n from '../../i18n';
import Currency from '../../models/Currency';
import CurrencyInput from './CurrencyInput';

let onChange: jest.Mock;
let onCurrencyClick: jest.Mock;
let onFocus: jest.Mock;
let onBlur: jest.Mock;

function renderComponent(
    balance: number,
    currency: Currency,
    sign: '-' | '+',
    value: string
) {
    render(
        <I18nextProvider i18n={i18n}>
            <CurrencyInput
                balance={balance}
                currency={currency}
                sign={sign}
                value={value}
                onChange={onChange}
                onCurrencyClick={onCurrencyClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </I18nextProvider>
    );
}

beforeEach(() => {
    onChange = jest.fn();
    onCurrencyClick = jest.fn();
    onFocus = jest.fn();
    onBlur = jest.fn();
});

it('renders currency code and balance', () => {
    renderComponent(100, availableCurrencies[0], '+', '10');

    expect(screen.getByRole('group')).toHaveTextContent(
        `${availableCurrencies[0].code}Balance: 100`
    );
});

describe('when balance is exceeded', () => {
    describe('and sign is -', () => {
        it('renders balance exceeded message', () => {
            renderComponent(100, availableCurrencies[0], '-', '1000');

            expect(screen.getByRole('alert')).toHaveTextContent(
                'Exceed balance'
            );
            expect(screen.getByRole('group')).toHaveStyle(
                `background-color: ${Colors.ErrorBackground}`
            );
        });
    });

    describe('and sign is +', () => {
        it("doesn't render balance exceeded message", () => {
            renderComponent(100, availableCurrencies[0], '+', '1000');

            expect(screen.queryByRole('alert')).toBeNull();
            expect(screen.getByRole('group')).not.toHaveStyle(
                `background-color: ${Colors.ErrorBackground}`
            );
        });
    });
});

it('sets the input value with the sign', () => {
    renderComponent(100, availableCurrencies[0], '+', '1000');

    expect(screen.getByRole('textbox')).toHaveValue('+1000');
});

describe('when a correct value is inputted', () => {
    it('triggers onChange', () => {
        renderComponent(100, availableCurrencies[0], '+', '10');

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: '100.23' },
        });

        expect(onChange).toHaveBeenCalledWith('100.23');
    });

    it('prettifies the value', () => {
        renderComponent(100, availableCurrencies[0], '+', '10');

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: '.' },
        });

        expect(onChange).toHaveBeenCalledWith('0.');
    });
});

describe('when an incorrect value is inputted', () => {
    it("doesn't trigger onChange", () => {
        renderComponent(100, availableCurrencies[0], '+', '10');

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: '10a0.23' },
        });

        expect(onChange).not.toHaveBeenCalled();
    });
});

it('triggers onCurrencyClick', () => {
    renderComponent(100, availableCurrencies[0], '+', '10');

    fireEvent.click(screen.getByRole('button'));

    expect(onCurrencyClick).toHaveBeenCalled();
});

it('triggers onFocus', () => {
    renderComponent(100, availableCurrencies[0], '+', '10');

    fireEvent.focus(screen.getByRole('textbox'));

    expect(onFocus).toHaveBeenCalled();
});

it('triggers onBlur', () => {
    renderComponent(100, availableCurrencies[0], '+', '10');

    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlur).toHaveBeenCalled();
});