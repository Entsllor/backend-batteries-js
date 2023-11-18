export function isIsoDateString(value: unknown): value is string {
    if (typeof value !== "string") {
        return false
    }
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toISOString() === value.toString();
}