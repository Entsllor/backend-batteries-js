import vine from "@vinejs/vine";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {Infer, SchemaTypes} from "@vinejs/vine/build/src/types";

export function Body<Schema extends SchemaTypes<any, any, any>, P, Query, Res, Locals extends Record<string, any>>(schema: Schema): RequestHandler<P, Res, Infer<Schema>, Query, Locals> {
    const validator = vine.compile(schema)
    return async function (req: Request, _: Response, next: NextFunction) {
        try {
            req.body = await validator.validate(req.body);
            next();
        } catch (e) {
            next(e)
        }
    } as any
}