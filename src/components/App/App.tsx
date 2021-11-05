import React from 'react';
import { Page } from '../../common-styles/page';
import ExchangePage from '../ExchangePage/ExchangePage';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Container } from './style';

function App() {
    return (
        <Container>
            <LoadingPage>
                <ExchangePage></ExchangePage>
            </LoadingPage>
        </Container>
    );
}

export default App;
