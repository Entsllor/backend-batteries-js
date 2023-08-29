function toSnakeCase(text: string) {
    return ((text.at(0)?.toLowerCase() ?? '')
        + text.slice(1)).replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

type ExceptionOptionsType<ExtraType> = {
    description?: string,
    status?: number,
    extra?: ExtraType
}

export abstract class AppException<ExtraType extends Record<string, any> = object> {
    status: number = 400
    description?: string = undefined
    extra?: ExtraType

    getDescription() {
        return this.description
    }

    constructor(options?: ExceptionOptionsType<ExtraType>) {
        this.description = options?.description ?? this.description
        this.status = options?.status ?? this.status
        this.extra = options?.extra
    }

    asJson() {
        return {
            status: this.status,
            message: toSnakeCase(this.constructor.name).toUpperCase(),
            description: this.getDescription(),
            ...this.extra
        }
    }
}
