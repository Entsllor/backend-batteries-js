import {raise} from "../../exceptions";
import {Result} from "../../types";
import {isValidDate} from "../datetimes";

type InferSchemaType<T> = T extends typeof Date | Date
    ? Date
    : T extends (value: any) => infer U
      ? U
      : T extends Schema<infer U>
        ? U
        : T extends object
          ? {[K in keyof T]: InferSchemaType<T[K]>}
          : T;

interface Schema<T> {
    parse(value: T): T;
    parse(value: unknown): T;
}

interface ValidationContext {
    optional?: boolean;
    defaultValue?: any;
    strict?: boolean;
    field?: string;
    min?: any;
    max?: any;
}

const PARSERS = new Map<any, (value: unknown, context: ValidationContext) => any>();
PARSERS.set(Number, parseNumber);
PARSERS.set(Date, parseDate);
PARSERS.set(String, String);
PARSERS.set(Boolean, Boolean);

const DummyParser = <T>(v: any): T => v;

function getParser(constructor: any) {
    return PARSERS.get(constructor) ?? DummyParser;
}

class Schema<T> {
    readonly context: ValidationContext;

    constructor(
        private parser: (value: unknown, context: ValidationContext) => T,
        context: ValidationContext
    ) {
        const parsedDefaultValue = context.defaultValue !== undefined ? this.parse(context.defaultValue) : undefined;

        this.context =
            parsedDefaultValue !== context.defaultValue ? {...context, defaultValue: parsedDefaultValue} : context;
    }

    parse(value: any) {
        if (value === undefined) {
            if (this.context.defaultValue) {
                return this.context.defaultValue;
            } else if (!this.context.optional) {
                throw new SchemaValidationError({field: this.context.field, message: "Field is required"});
            }
        }
        return this.parser(value, this.context);
    }

    safeParse(value: any): Result<T> {
        try {
            return [undefined, this.parse(value)];
        } catch (e) {
            return [e as Error, undefined];
        }
    }
}

export function createSchema<T>(schema: T, context?: ValidationContext): Schema<InferSchemaType<T>> {
    context = context ?? {};
    if (schema instanceof Schema) {
        return schema;
    }

    if (typeof schema === "function") {
        return createFunctionSchema(schema as any, context);
    }

    if (isPrimitive(schema)) {
        return createPrimitiveSchema(schema, context);
    }

    if (isPlainObject(schema)) {
        return createObjectSchema(schema, context);
    }

    throw new Error("Unsupported schema type");
}

function createFunctionSchema(schema: (value: any) => any, context: ValidationContext): Schema<any> {
    if (schema === Date) {
        return new Schema(PARSERS.get(Date)!, context);
    }
    return new Schema(schema, context);
}

function createPrimitiveSchema(primitive: string | number | boolean | Date, context: ValidationContext): Schema<any> {
    const constructor = primitive instanceof Date ? Date : primitive.constructor;
    return new Schema(getParser(constructor), {...context, defaultValue: context.defaultValue ?? primitive});
}

function createObjectSchema(schema: Record<string, any>, context: ValidationContext): Schema<any> {
    return new Schema(value => {
        if (!isPlainObject(value)) {
            return;
        }

        const result: Record<string, any> = {};
        for (const key in schema) {
            const fieldSchema = createSchema(schema[key], {...context, field: joinFieldPath(context.field, key)});
            result[key] = fieldSchema.parse(value[key]);
        }
        return result;
    }, context);
}

function isPrimitive(value: unknown): value is string | number | boolean | Date {
    return (
        typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value instanceof Date
    );
}

function isPlainObject(value: unknown): value is Record<string, any> {
    return typeof value === "object" && value !== null;
}

function parseNumber(num: any, context: ValidationContext): number {
    let isValid = true;
    var type = typeof num;

    if (type === "string" || num instanceof String) {
        // an empty string would be coerced to true with the below logic
        if (!num.trim()) isValid = false;
    } else if (type !== "number" && !(num instanceof Number)) {
        isValid = false;
    }

    if (!isValid || num - num + 1 < 0) {
        throw new SchemaValidationError({message: "Invalid Number", field: context.field});
    }
    return Number(num);
}

function parseDate(value: unknown, _context: ValidationContext) {
    return isValidDate(value)
        ? value instanceof Date
            ? value
            : new Date(value)
        : raise(SchemaValidationError, {message: "Invalid date"});
}

export class SchemaValidationError extends Error {
    constructor(public context: undefined | string | {field?: string; message: string}) {
        super(typeof context === "string" ? context : (context?.message ?? "Failed to parse value"));
    }
}

function joinFieldPath(left: string | undefined, right: string | undefined): string | undefined {
    if (!left && !right) {
        return;
    }
    if (!right) {
        return left;
    }
    if (!right) {
        return left;
    }
    return left + "." + right;
}
