import React from 'react';
import DataProvider from '../DataProvider';
import ExchangePage from '../ExchangePage';
import { Container } from './style';

function App() {
    return (
        <Container>
            <DataProvider>
                <ExchangePage></ExchangePage>
            </DataProvider>
        </Container>
    );
}

export default App;
