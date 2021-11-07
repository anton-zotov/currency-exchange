import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { availableCurrencies } from '../../config';
import i18n from '../../i18n';
import SuccessfulExchangeNotification from './SuccessfulExchangeNotification';

let onClose: jest.Mock;

beforeEach(() => {
    jest.useFakeTimers();
    onClose = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <SuccessfulExchangeNotification
                fromAmount="12"
                fromCurrency={availableCurrencies[0]}
                toAmount="34"
                toCurrency={availableCurrencies[1]}
                onClose={onClose}
            />
        </I18nextProvider>
    );
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

it('renders currencies and amounts', () => {
    expect(screen.getByRole('alertdialog')).toHaveTextContent(
        `You exchanged${availableCurrencies[0].format(
            12
        )} to ${availableCurrencies[1].format(34)}`
    );
});

it('calls onClose after 2 secons', () => {
    expect(onClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(onClose).toHaveBeenCalled();
});
