export function raise<ExceptionData>(exception: new (data?: ExceptionData) => any, data?: ExceptionData): never {
    if (!data) {
        throw new exception()
    }
    throw new exception(data);
}
