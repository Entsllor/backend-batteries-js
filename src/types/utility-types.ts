export type UUID = string;
export type DateString = string;
export type Unpacked<T> = T extends (infer U)[] ? U : T;
export type MaybePromise<T> = Promise<T> | T;
export type Result<T> = [undefined, T] | [Error, undefined];
export type Dict<T = any> = {[field: string]: T};
