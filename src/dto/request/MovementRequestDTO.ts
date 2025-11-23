import { IsString, IsNumber, Matches } from 'class-validator';

export default class MovementRequestDTO{

    @IsString()
    public type!: string;

    @IsNumber()
    public amount!: number;

    @IsString()
    public description!: string;

    @IsString()
    public frequency!: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public startDate!: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public endDate!: string;
}