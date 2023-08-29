export type UUID = string;
export type DateString = string;
export type Unpacked<T> = T extends (infer U)[] ? U : T;
