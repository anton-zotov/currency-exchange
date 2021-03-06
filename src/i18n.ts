import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
    },
    lng: 'en',
    fallbackLng: 'en',
});

export default i18n;
