import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class PersonRequestDTO{

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}