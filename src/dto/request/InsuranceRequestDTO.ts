import { IsString, IsNumber, Matches, IsNotEmpty } from 'class-validator';

export default class InsuranceRequestDTO{

    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name is required' })
    public name!: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'startDate must be in YYYY-MM-DD format',
    })
    @IsNotEmpty({ message: 'startDate is required' })
    public startDate!: string;

    @IsNumber({}, { message: 'duration must be a number' })
    @IsNotEmpty({ message: 'duration is required' })
    public duration!: number;

    @IsNumber({}, { message: 'monthlyValue must be a number' })
    @IsNotEmpty({ message: 'monthlyValue is required' })
    public monthlyValue!: number;

    @IsNumber({}, { message: 'insuredValue must be a number' })
    @IsNotEmpty({ message: 'insuredValue is required' })
    public insuredValue!: number;
    
}