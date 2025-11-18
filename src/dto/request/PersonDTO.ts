import { IsString, IsNumber, Matches, IsNotEmpty, IsEmail } from 'class-validator';

export default class PersonDTO{

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}