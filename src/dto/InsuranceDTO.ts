import { IsString, IsNumber, Matches } from 'class-validator';

export default class InsuranceDTO{

    @IsString()
    public name!: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public startDate!: string;

    @IsNumber()
    public duration!: number;

    @IsNumber()
    public monthlyValue!: number;

    @IsNumber()
    public insuredValue!: number;
    
}