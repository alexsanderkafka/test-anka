import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import type PersonDTO from "../dto/PersonDTO";
import AuthService from "../service/AuthService";
import EmptyField from "../errors/EmptyFieldsError";


@JsonController('/auth')
export default class AuthController {

    private authService: AuthService = new AuthService();

    @Post('/create')
    public async create(@Body() body: any, @Res() res: any, @Req() req: Request): Promise<any> {

        //limite de caracteres na password
        
        const dto: PersonDTO = JSON.parse(JSON.stringify(body));

        if (!dto.name || !dto.email || !dto.password){
            throw new EmptyField('Empty field');
        }

        await this.authService.createUser(dto);

        return res.status(201).json({ message: 'User created successfully' });
    }
}