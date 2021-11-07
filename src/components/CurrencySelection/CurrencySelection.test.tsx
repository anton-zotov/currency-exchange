import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { availableCurrencies } from '../../config';
import i18n from '../../i18n';
import Balance from '../../models/Balance';
import Currency from '../../models/Currency';
import { BalanceContext } from '../../utils/Contexts';
import CurrencySelection from './CurrencySelection';

let onClose: jest.Mock;
let onSelect: jest.Mock;

const balance: Balance = {
    CZK: 50,
    EUR: 100,
    USD: 200,
};
const getBalance = (currency: Currency) => balance[currency.code];

beforeEach(() => {
    jest.useFakeTimers();

    onClose = jest.fn();
    onSelect = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <BalanceContext.Provider value={[getBalance, () => {}]}>
                <CurrencySelection onClose={onClose} onSelect={onSelect} />
            </BalanceContext.Provider>
        </I18nextProvider>
    );
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

it("renders displays currency code, label and balance", () => {
    expect(screen.getAllByRole('listitem').length).toBe(
        availableCurrencies.length
    );

    screen.getAllByRole('listitem').forEach((listItem, i) => {
        const cur = availableCurrencies[i];
        const curBalance = getBalance(cur);
        const label =
            i18n.getDataByLanguage('en')?.translation.currency[
                cur.label as any
            ];

        expect(listItem).toHaveTextContent(
            `${cur.code} ${curBalance ? `· ${curBalance}` : ''}${label}`
        );
    });
});
