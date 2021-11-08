import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import App from './App';
import { openExchangeRatesUrl } from '../../config';
import { mockRates } from '../../utils/Mocks';

const server = setupServer(
    rest.get(openExchangeRatesUrl.split('?')[0], (req, res, ctx) => {
        return res(ctx.json({ rates: mockRates }));
    })
);

function setup() {
    render(<App />);
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders loading screen', () => {
    setup();

    expect(screen.getByTestId('loading-icon')).toBeTruthy();
});
