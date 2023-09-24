import type {NextFunction, Request, RequestHandler, Response} from "express";
import type {Infer, SchemaTypes} from "@vinejs/vine/build/src/types";

import vine from "@vinejs/vine";

export function Query<Schema extends SchemaTypes, P, Req, Res, Locals extends Record<string, any>>(schema: Schema): RequestHandler<P, Res, Req, Infer<Schema>, Locals> {
    const validator = vine.compile(schema)
    return async function (req: Request, _: Response, next: NextFunction) {
        try {
            req.query = await validator.validate(req.query);
            next();
        } catch (e) {
            next(e)
        }
    } as any
}
