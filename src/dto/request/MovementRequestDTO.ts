import { IsString, IsNumber, Matches, IsNotEmpty } from 'class-validator';

export default class MovementRequestDTO{
    @IsString({message: 'type must be a string'})
    @IsNotEmpty({message: 'type should not be empty'})
    public type!: string;

    @IsNumber({}, {message: 'amount must be a number'})
    @IsNotEmpty({message: 'amount should not be empty'})
    public amount!: number;

    @IsString({message: 'description must be a string'})
    @IsNotEmpty({message: 'description should not be empty'})
    public description!: string;

    @IsString({message: 'frequency must be a string'})
    @IsNotEmpty({message: 'frequency should not be empty'})
    public frequency!: string;

    @IsString({message: 'startDate must be a string'})
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'startDate must be in YYYY-MM-DD format',
    })
    @IsNotEmpty({message: 'startDate should not be empty'})
    public startDate!: string;

    @IsString({message: 'endDate must be a string'})
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'endDate must be in YYYY-MM-DD format',
    })
    @IsNotEmpty({message: 'endDate should not be empty'})
    public endDate!: string;
}