import {ConstructableSchema, FieldContext, Infer} from "@vinejs/vine/build/src/types";

type ParserFieldContext = Pick<FieldContext, 'data' | 'parent' | 'meta'>;
type InferableVineType = ConstructableSchema<any, any> & { parse: (value: unknown, ctx?: ParserFieldContext) => any };

export type WithDefaultParser = <TVineSchema extends InferableVineType>(vineType: TVineSchema, defaultValue: Infer<TVineSchema>) => TVineSchema
export type WithParserType = <TVineSchema extends InferableVineType>(vineType: TVineSchema, parser: (value: unknown, ctx: ParserFieldContext) => Infer<TVineSchema>) => TVineSchema
