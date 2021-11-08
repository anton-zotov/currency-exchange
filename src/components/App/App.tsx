import React from 'react';
import DataProvider from '../DataProvider';
import ErrorBoundary from '../ErrorBoundary';
import ExchangePage from '../ExchangePage';
import { Container } from './style';

function App() {
    return (
        <ErrorBoundary>
            <Container>
                <DataProvider>
                    <ExchangePage></ExchangePage>
                </DataProvider>
            </Container>
        </ErrorBoundary>
    );
}

export default App;
