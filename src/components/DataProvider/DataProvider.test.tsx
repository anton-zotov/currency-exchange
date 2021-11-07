import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import DataProvider from './DataProvider';
import { openExchangeRatesUrl } from '../../config';
import { mockRates } from '../../utils/Mocks';

const server = setupServer(
    rest.get(openExchangeRatesUrl, (req, res, ctx) => {
        return res(ctx.json({ rates: mockRates }));
    })
);

function setup() {
    render(
        <DataProvider>
            <h1 data-testid="content">Loaded</h1>
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

it('renders loading screen', async () => {
    setup();

    await waitFor(() => screen.getByTestId('content'));
    expect(screen.getByTestId('content')).toBeTruthy();
});
