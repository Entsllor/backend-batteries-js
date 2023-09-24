export function isValidDate(value: any): boolean {
    if (typeof value === 'string' || typeof value === 'number') {
        // Try to parse the value as a Date
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime());
    }
    if (value instanceof Date) {
        // Check if it's a valid Date object
        return !isNaN(value.getTime());
    } else {
        return false;
    }
}
