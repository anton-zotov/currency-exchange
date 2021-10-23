export function formatAmount(amount: string | number) {
    const amountStr = amount.toString();
    const dotIndex = amountStr.indexOf('.');
    return dotIndex === -1 ? amountStr : amountStr.slice(0, dotIndex + 3);
}
