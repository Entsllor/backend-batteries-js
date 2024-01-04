export function raise<ExceptionData>(exception: new (data?: ExceptionData) => any, data?: ExceptionData): never {
    throw new exception(data);
}
