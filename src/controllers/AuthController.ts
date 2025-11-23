import { Body, JsonController, Post, Req, Res, UseAfter, UseBefore } from "routing-controllers";
import AuthService from "../service/AuthService";
import PersonRequestDTO from "../dto/request/PersonRequestDTO";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import ValidatorError from "../errors/ValidatorError";

@JsonController('/auth')
export default class AuthController {

    private authService: AuthService = new AuthService();

    @Post('/create')
    public async create(@Body({ validate: false }) body: PersonRequestDTO, @Res() res: any) {  
        const errors = await validate(plainToInstance(PersonRequestDTO, body));
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();

            throw new ValidatorError(errorMessages.join(', '));
        }

        await this.authService.createUser(body);

        return res.status(201).json({ message: 'User creted successfully' });
    }
}