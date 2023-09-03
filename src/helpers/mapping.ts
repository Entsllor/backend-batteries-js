export function skipFalsy<T>(...value: (T | false | "" | null | undefined | 0)[]): T[] {
    return value.filter(Boolean) as T[];
}

export function mapArray<T, U extends keyof T>(array: T[], key: U): Record<string, T> {
    return Object.fromEntries((array ?? []).map(i => [i[key], i]));
}

export function valuesOf<T>(obj: { [s: string | number | symbol]: T } | undefined | null): T[] {
    if (!obj) {
        return []
    }
    return Object.values(obj);
}

export function keysOf<T extends object>(obj: T | undefined | null): keyof T[] {
    if (!obj) {
        return [] as any
    }
    return Object.keys(obj) as any;
}
