import { Get, JsonController, Res } from "routing-controllers";

@JsonController("/teste")
export default class Teste {

    @Get()
    public async helloWorld(@Res() res: any): Promise<any> {
        return res.json({ message: "Hello, World!" }, 200);
    }
}