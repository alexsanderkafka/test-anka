import BaseError from "./BaseError";

export default class ValidatorError extends BaseError{
    constructor(msg: string) {
        super(msg, 400);
    }
}