import { render, screen } from '@testing-library/react';
import LoadingPage from './LoadingPage';

it('renders loading icon', () => {
    render(<LoadingPage />);

    expect(screen.getByTestId('loading-icon')).toBeTruthy();
});
