import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import type PersonDTO from "../dto/request/PersonDTO";
import AuthService from "../service/AuthService";

@JsonController('/auth')
export default class AuthController {

    private authService: AuthService = new AuthService();

    @Post('/create')
    public async create(@Body() body: PersonDTO, @Res() res: any, @Req() req: any) {
        await this.authService.createUser(body);

        return res.status(201).json({ message: 'User created successfully' });
    }
}