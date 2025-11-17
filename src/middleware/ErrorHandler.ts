import { Middleware, type ExpressErrorMiddlewareInterface } from "routing-controllers";
import ExistingUserError from "../errors/ExistingUserError";

@Middleware({ type: "after" })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface{

    error(error: any, request: any, response: any, next: (err?: any) => any): void {

        console.error("🔥 ERROR CAPTURADO NO MIDDLEWARE:", error, error?.constructor?.name);

        if(error instanceof ExistingUserError){
            return response.status(409).json({ detail: error.message });
        }

        /*
        return response.status(500).json({
            detail: 'Internal server error',
            error: error.message
        });*/

        next(error);
    }

}