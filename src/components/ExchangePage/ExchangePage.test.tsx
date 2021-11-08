import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ExchangePage from './ExchangePage';
import { availableCurrencies } from '../../config';
import { mockRates } from '../../utils/Mocks';
import { BalanceContext, ExchangeRatesContext } from '../../utils/Contexts';
import Currency from '../../models/Currency';
import Balance from '../../models/Balance';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

let balance: Balance;
let inputs: HTMLElement[];
let balances: HTMLElement[];
let changeFromValue: (value: string) => void;
let changeToValue: (value: string) => void;
let rerender: any;

const getBalance = (currency: Currency) => balance[currency.code] / 100;
const modifyBalance = (amount: number, currency: Currency) =>
    (balance[currency.code] += amount);

const boilerplate = (areRatesStale: boolean) => (
    <I18nextProvider i18n={i18n}>
        <BalanceContext.Provider value={[getBalance, modifyBalance]}>
            <ExchangeRatesContext.Provider value={[mockRates, areRatesStale]}>
                <ExchangePage />;
            </ExchangeRatesContext.Provider>
        </BalanceContext.Provider>
    </I18nextProvider>
);

async function setup() {
    balance = availableCurrencies.reduce(
        (acc, currency, i) => ({
            ...acc,
            [currency.code]: 10000 * (i + 1),
        }),
        {}
    );

    const renderResult = render(boilerplate(false));

    await waitFor(() => screen.getAllByRole('textbox'));

    rerender = renderResult.rerender;
    inputs = screen.getAllByRole('textbox');
    balances = screen.getAllByTestId('balance');

    changeFromValue = (value: string) =>
        fireEvent.change(inputs[0], { target: { value } });
    changeToValue = (value: string) =>
        fireEvent.change(inputs[1], { target: { value } });
}

beforeEach(async () => await setup());

it('has disabled exchange button when fields are empty', () => {
    expect(screen.getByTestId('exchange-button')).toBeDisabled();
});

it('has enabled exchange button when fields are filled', () => {
    changeFromValue('1');

    expect(screen.getByTestId('exchange-button')).toBeEnabled();
});

it('shows correct balance', () => {
    expect(balances[0]).toHaveTextContent('Balance: 200');
    expect(balances[1]).toHaveTextContent('Balance: 300');
});

it('shows converted amount', () => {
    changeFromValue('1');

    expect(inputs[1]).toHaveValue('-0.78');
});

it('shows exchange rate', () => {
    expect(screen.getByTestId('exchange-rate')).toHaveTextContent('£1 = €0.78');
});

it('shows success notification on exhcnage', () => {
    expect(screen.queryByRole('alertdialog')).toBeNull();

    changeFromValue('1');
    fireEvent.click(screen.getByTestId('exchange-button'));

    expect(screen.getByRole('alertdialog')).toBeTruthy();
    expect(screen.getByRole('alertdialog')).toHaveTextContent(
        `You exchanged${availableCurrencies[1].format(
            1
        )} to ${availableCurrencies[2].format(0.78)}`
    );
});

it('changes balance on exchange', () => {
    changeFromValue('1');
    fireEvent.click(screen.getByTestId('exchange-button'));

    expect(balances[0]).toHaveTextContent('Balance: 201');
    expect(balances[1]).toHaveTextContent('Balance: 299.21');
});

it('shows current operation', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Buy GBP');
    expect(screen.queryByTestId('arrow-up')).toBeTruthy();
    expect(screen.queryByTestId('arrow-down')).toBeNull();
});

it('changes operation', () => {
    fireEvent.click(screen.getByTestId('operation'));

    expect(screen.getByRole('heading')).toHaveTextContent('Sell GBP');
    expect(screen.queryByTestId('arrow-down')).toBeTruthy();
    expect(screen.queryByTestId('arrow-up')).toBeNull();
});

it('sells after changing operation', () => {
    changeFromValue('1');
    fireEvent.click(screen.getByTestId('operation'));
    fireEvent.click(screen.getByTestId('exchange-button'));

    expect(balances[0]).toHaveTextContent('Balance: 199');
    expect(balances[1]).toHaveTextContent('Balance: 300.78');
});

it('shows correct currencies', () => {
    fireEvent.click(screen.getAllByTestId('change-currency-button')[0]);
    fireEvent.click(screen.getAllByRole('listitem')[0]);
    fireEvent.click(screen.getAllByTestId('change-currency-button')[1]);
    fireEvent.click(screen.getAllByRole('listitem')[3]);

    expect(screen.getByRole('heading')).toHaveTextContent(
        `Buy ${availableCurrencies[0].code}`
    );
    expect(
        screen.getAllByTestId('change-currency-button')[0]
    ).toHaveTextContent(availableCurrencies[0].code);
    expect(
        screen.getAllByTestId('change-currency-button')[1]
    ).toHaveTextContent(availableCurrencies[3].code);
    expect(screen.getByTestId('exchange-button')).toHaveTextContent(
        `Buy ${availableCurrencies[0].code} with ${availableCurrencies[3].code}`
    );
});

it('swaps currencies when another field has the same as newly selected', () => {
    fireEvent.click(screen.getAllByTestId('change-currency-button')[0]);
    fireEvent.click(screen.getAllByRole('listitem')[2]);

    expect(
        screen.getAllByTestId('change-currency-button')[0]
    ).toHaveTextContent(availableCurrencies[2].code);
    expect(
        screen.getAllByTestId('change-currency-button')[1]
    ).toHaveTextContent(availableCurrencies[1].code);
});

it('shows stale rates notification', () => {
    expect(screen.queryByTestId('stale-rates-notification')).toBeNull();

    rerender(boilerplate(true));

    expect(screen.getByTestId('stale-rates-notification')).toBeTruthy();
});

it('updates converted amount after currency change', () => {
    changeFromValue('1');

    fireEvent.click(screen.getAllByTestId('change-currency-button')[0]);
    fireEvent.click(screen.getAllByRole('listitem')[0]);

    expect(inputs[1]).toHaveValue('-0.04');
});
