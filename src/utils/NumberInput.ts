export function validateNumber(val: string) {
    const validSymbols = '0123456789.';
    const lastSymbol = val[val.length - 1];
    const valArr = Array.from(val.toString());
    if (!lastSymbol) {
        return true;
    }
    if (!valArr.every((c) => validSymbols.includes(c))) {
        return false;
    }

    const dotAmount = valArr.reduce(
        (amount, c) => amount + (c === '.' ? 1 : 0),
        0
    );
    if (dotAmount > 1) {
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
