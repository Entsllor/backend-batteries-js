import type {IRouter, RequestHandler, RouterOptions} from "express";
import type {Infer, SchemaTypes} from "@vinejs/vine/build/src/types";
import {Body, Params} from "./vine";
import {skipFalsy} from "../helpers";


type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

interface IHandlerOptions<Body extends SchemaTypes, Query extends SchemaTypes, Params extends SchemaTypes> {
    body?: Body
    query?: Query
    params?: Params
}

type _OptionSchema<T extends SchemaTypes | undefined> = T extends SchemaTypes ? Infer<T> : never;

/**
 * This function create an Api instance that allows you to handle http requests
 */
export function ApiFactory<T extends IRouter>(routerFactory: (options: RouterOptions) => T, options: RouterOptions) {
    const _router = routerFactory(options)

    function handler<Body extends SchemaTypes, Query extends SchemaTypes, Params extends SchemaTypes>
    (method: Method, path: string, options: IHandlerOptions<Body, Query, Params>): (...handlers: RequestHandler<_OptionSchema<Params>, any, _OptionSchema<Body>, _OptionSchema<Query>, any>[]) => void {
        const baseHandlers = skipFalsy(options.body && Body(options.body), options.params && Params(options.params), options.query && Params(options.query))
        return (...extraHandlers: any) => _router[method](path, ...baseHandlers, ...extraHandlers)
    }

    (_router as any).handler = handler
    return _router as T & { handler: typeof handler }
}

// Get instance of Api
// const testApi = ApiFactory(express.Router, {});
//
// Use .handler method for processing requests
// testApi.handler('post', '/test', {body: TestDto})(
//     async ({body}, res) => {
//         res.status(200).send('hello ' + body.username)
//     },
// )
