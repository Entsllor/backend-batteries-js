import type {NextFunction, Request, RequestHandler, Response} from "express";
import type {Infer, SchemaTypes} from "@vinejs/vine/build/src/types";

import vine from "@vinejs/vine";

export function Params<Schema extends SchemaTypes, Query, Req, Res, Locals extends Record<string, any>>(schema: Schema): RequestHandler<Infer<Schema>, Res, Req, Query, Locals> {
    const validator = vine.compile(schema)
    return async function (req: Request, _: Response, next: NextFunction) {
        try {
            req.params = await validator.validate(req.params);
            next();
        } catch (e) {
            next(e)
        }
    } as any
}