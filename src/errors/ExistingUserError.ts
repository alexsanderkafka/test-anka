import BaseError from "./BaseError";

export default class ExistingUserError extends BaseError{
    constructor(msg: string) {
        super(msg, 409);
    }
}