import { TFunction } from 'i18next';
import Currency from '../models/Currency';

const lc = (s: string) => s.toLowerCase();

export const filterCurrenciesPredicate =
    (query: string, t: TFunction) => (currency: Currency) =>
        lc(currency.code).includes(lc(query)) ||
        lc(t(currency.label)).includes(lc(query));
