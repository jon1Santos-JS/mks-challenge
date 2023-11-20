export default function useString() {
    function currencyFormat(value: string | number, format: string) {
        const formatedString = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: format,
        })
            .format(typeof value === 'number' ? value : Number(value))
            .replace(/\s/g, '');

        return formatedString;
    }

    function toTrimString(content: string, amount: number) {
        const contentArray = content.split(' ');
        const trimmedContent = contentArray
            .filter((value, index) => {
                if (index >= amount) return '';
                return value;
            })
            .join(' ');

        return trimmedContent;
    }

    function toAddDots(content: string) {
        const arrayFromString = content.split('');
        arrayFromString.push('...');
        const reformedString = arrayFromString.join('');
        return reformedString;
    }

    return { toTrimString, toAddDots, currencyFormat };
}
