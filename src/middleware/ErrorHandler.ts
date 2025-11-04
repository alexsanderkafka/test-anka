import { Middleware, type ExpressErrorMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "after" })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface{

    error(error: any, request: any, response: any, next: (err?: any) => any): void {
        next(error);
    }

}