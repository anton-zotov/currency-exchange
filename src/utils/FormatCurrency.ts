import Currency from '../models/Currency';

export function getFormatCurrency(
    symbolPos: 'left' | 'right',
    spacesInBetween: number
): (amount: number | string) => string {
    return function (this: Currency, amount) {
        const spaces = ' '.repeat(spacesInBetween);
        return symbolPos === 'left'
            ? `${this.symbol}${spaces}${amount}`
            : `${amount}${spaces}${this.symbol}`;
    };
}
