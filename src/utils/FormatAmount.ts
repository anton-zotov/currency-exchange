export function formatAmount(amount: string | number, removeZeros = false) {
    const amountStr = amount.toString();
    const dotIndex = amountStr.indexOf('.');
    if (dotIndex === -1) return amountStr;

    let slicePos = Math.min(dotIndex + 3, amountStr.length);
    if (removeZeros) {
        while (slicePos > dotIndex && ['0', '.'].includes(amountStr[slicePos - 1])) {
            slicePos--;
        }
    }

    return amountStr.slice(0, slicePos);
}
