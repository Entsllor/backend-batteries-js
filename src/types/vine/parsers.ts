import {BaseLiteralType, BaseType} from "@vinejs/vine";
import {Infer, FieldContext} from "@vinejs/vine/build/src/types";

type InferableVineType = BaseType<any, any> | BaseLiteralType<any, any>;

export type WithDefaultParser = <TVineSchema extends InferableVineType>(vineType: TVineSchema, defaultValue: Infer<TVineSchema>) => TVineSchema
export type WithParserType = <TVineSchema extends InferableVineType>(vineType: TVineSchema, parser: (value: unknown, ctx: Pick<FieldContext, 'data' | 'parent' | 'meta'>) => Infer<TVineSchema>) => TVineSchema