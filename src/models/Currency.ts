type Currency = {
    code: string;
    label: string;
    symbol: string;
    format(amount: number | string): string;
};

export default Currency;
