import { HttpError } from "routing-controllers";

export default class BaseError extends HttpError {
    private msg: string;

    constructor(msg: string, statusCode: number) {
        super(statusCode);
        this.msg = msg;
        Object.setPrototypeOf(this, BaseError.prototype);
    }

    toJSON() {
        return {
            timestamp: new Date(),
            statusCode: this.httpCode,
            message: this.msg,
        }
    }
}