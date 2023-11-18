export function isValidDate(value: unknown): value is number | string | Date {
    if (typeof value === 'string' || typeof value === 'number') {
        // Try to parse the value as a Date
        return !isNaN((new Date(value)).getTime());
    }
    if (value instanceof Date) {
        // Check if it's a valid Date object
        return !isNaN(value.getTime());
    }
    return false;
}
