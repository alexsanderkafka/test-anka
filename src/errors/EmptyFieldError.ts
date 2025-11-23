import BaseError from "./BaseError";

export default class EmptyField extends BaseError{
    constructor(msg: string) {
        super(msg, 400);
    }
}