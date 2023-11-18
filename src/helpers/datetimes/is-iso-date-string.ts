export function isIsoDateString(value: unknown): value is string {
    if (typeof value !== "string") {
        return false
    }
    const date = new Date(value);
    return !isNaN(date.getTime()) && /^-?\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value);
}