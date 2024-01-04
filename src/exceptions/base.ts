function toSnakeCase(text: string) {
    return ((text[0]?.toLowerCase() ?? "") + text.slice(1)).replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

type ExceptionOptionsType<ExtraType> = {
    message?: string;
    status?: number;

    // extra data that will be displayed to user on errors
    extra?: ExtraType;

    // Can be used by error handlers
    callback?: (err: AppException) => void;
};

export abstract class AppException<ExtraType extends Record<string, any> = object> extends Error implements Error {
    status: number = 400;
    name: string; // auto-field. Usually value is className in upper snake_case. AppException => APP_EXCEPTION
    message: string; //
    extra?: ExtraType;
    callback?: ExceptionOptionsType<any>["callback"];

    getMessage() {
        return this.message;
    }

    constructor(options?: string | ExceptionOptionsType<ExtraType>) {
        if (typeof options === "string") {
            options = {message: options};
        }
        super(options?.message ?? "");
        this.message = options?.message ?? "";
        this.status = options?.status ?? this.status;
        this.extra = options?.extra;
        this.callback = options?.callback;
        this.name = this.constructor.name;
    }

    asJson() {
        return {
            status: this.status,
            error: toSnakeCase(this.name).toUpperCase(),
            message: this.getMessage(),
            ...this.extra,
        };
    }
}
