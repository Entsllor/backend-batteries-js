import {AppException} from "./base";

export class BadRequest extends AppException {
    status = 400
    description = 'Server cannot process this request'
}

export class Forbidden extends AppException<{
    test: number
}> {
    status = 403
    description = "Access denied"
}

export class NotFound extends AppException {
    status = 404
    entityName: string = 'entity'

    getDescription(): string {
        return this.entityName.at(0) + this.entityName.slice(1) + ' not found'
    }
}

export class InternalServerError extends AppException {
    status = 500
    description = 'Something went wrong... and we trying to fix this!'
}

