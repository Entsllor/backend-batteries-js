import {AppException} from "./base";

export class BadRequest extends AppException {
    status = 400
    message = 'Server cannot process this request'
}

export class Forbidden extends AppException<{
    test: number
}> {
    status = 403
    message = "Access denied"
}

export class NotFound extends AppException {
    status = 404
    entityName: string = 'entity'

    getMessage(): string {
        return (this.entityName?.[0] ?? '') + this.entityName.slice(1) + ' not found'
    }
}

export class InternalServerError extends AppException {
    status = 500
    message = 'Something went wrong'
}
