import type {NextFunction, Request, RequestHandler, Response} from "express";
import type {Infer, SchemaTypes} from "@vinejs/vine/build/src/types";

import vine from "@vinejs/vine";

export function Body<Schema extends SchemaTypes, P, Query, Res, Locals extends Record<string, any>>(schema: Schema): RequestHandler<P, Res, Infer<Schema>, Query, Locals> {
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