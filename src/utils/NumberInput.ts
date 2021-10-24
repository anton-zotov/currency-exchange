export function validateNumber(val: string) {
    const validSymbols = '0123456789.';
    const lastSymbol = val[val.length - 1];
    if (!lastSymbol) {
        return true;
    }
    if (!validSymbols.includes(lastSymbol)) {
        return false;
    }
    if (lastSymbol === '.' && val.slice(0, val.length - 1).includes('.')) {
        // there are two dots
        return false;
    }
    return true;
}

export function prettifyNumber(val: string) {
    if (val.length === 2 && val.startsWith('0')) {
        val = val.slice(1);
    }
    if (val === '.') {
        val = '0.';
    }
    return val;
}
