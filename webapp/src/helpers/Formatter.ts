export const Formatter = {
    Currency: (value: number, currency: string, decimalSeparator: string): string => {
        const parts = value.toFixed(2).split('.');
        const formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const final =  currency + ' ' + formattedValue + decimalSeparator + parts[1];
        return final;
    }
}