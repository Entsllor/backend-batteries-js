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

export function isIsoDateString(value: unknown): value is string {
    if (typeof value !== "string") {
        return false
    }
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toISOString() === value.toString();
}