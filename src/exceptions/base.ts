function toSnakeCase(text: string) {
    return ((text[0]?.toLowerCase() ?? '')
        + text.slice(1)).replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

type ExceptionOptionsType<ExtraType> = {
    description?: string,
    status?: number,

    // extra data that will be displayed to user on errors
    extra?: ExtraType

    // Can be used by error handlers
    callback?: ((err: AppException) => void);
}

export abstract class AppException<ExtraType extends Record<string, any> = object> {
    status: number = 400
    description?: string = undefined
    extra?: ExtraType
    callback?: ExceptionOptionsType<any>['callback'];

    getDescription() {
        return this.description
    }

    constructor(options?: string | ExceptionOptionsType<ExtraType>) {
        if (typeof options === "string") {
            options = {description: options}
        }
        this.description = options?.description ?? this.description;
        this.status = options?.status ?? this.status
        this.extra = options?.extra
        this.callback = options?.callback
    }

    asJson() {
        return {
            status: this.status,
            type: toSnakeCase(this.constructor.name).toUpperCase(),
            description: this.getDescription(),
            ...this.extra
        }
    }
}
