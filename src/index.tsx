import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import 'typeface-roboto';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import en from './i18n/en.json';
import './style.css';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
    },
    lng: 'en',
    fallbackLng: 'en',
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
