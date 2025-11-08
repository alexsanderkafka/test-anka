import BaseError from "./BaseError";

export default class NotFoundEntityError extends BaseError{

    constructor(msg: string) {
        super(msg, 404);
    }
}