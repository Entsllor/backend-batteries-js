import {config} from "dotenv";

function removePrefix(key: string, prefix: string): string {
    if (prefix && key.startsWith(prefix)) {
        return key.slice(prefix.length)
    }
    return key
}

export function initAppSettings(rawSettings: object, options?: {
    prefix?: string,
    prepareKey?: (key: string) => string
}) {
    config()
    const prepareKey = options?.prepareKey ?? (key => key.toUpperCase())
    return Object.fromEntries(
        Object.entries(rawSettings)
            .filter(([k, _]) => k.startsWith(options?.prefix ?? ''))
            .map(([k, v]) => [removePrefix(prepareKey(k), options?.prefix ?? ''), v])
    )
}
