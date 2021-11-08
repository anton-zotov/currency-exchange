import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import DataProvider from './DataProvider';
import { openExchangeRatesUrl } from '../../config';
import { mockRates } from '../../utils/Mocks';
import { useContext } from 'react';
import { ExchangeRatesContext } from '../../utils/Contexts';

const server = setupServer(
    rest.get(openExchangeRatesUrl.split('?')[0], (req, res, ctx) => {
        return res(ctx.json({ rates: mockRates }));
    })
);

function RatesIndicator() {
    const [exchangeRates, areRatesStale] = useContext(ExchangeRatesContext);

    return <div data-testid="rates">{areRatesStale ? 'stale' : 'fresh'}</div>;
}

function setup() {
    render(
        <DataProvider>
            <h1 data-testid="content">Loaded</h1>
            <RatesIndicator />
        </DataProvider>
    );
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders loading screen', () => {
    setup();

    expect(screen.getByTestId('loading-icon')).toBeTruthy();
});

it('renders content', async () => {
    setup();

    await waitFor(() => screen.getByTestId('content'));
    expect(screen.getByTestId('content')).toBeTruthy();
});

it('rates should be fresh when api response is received', async () => {
    setup();

    await waitFor(() => screen.getByTestId('content'));
    expect(screen.getByTestId('rates')).toHaveTextContent('fresh');
});
