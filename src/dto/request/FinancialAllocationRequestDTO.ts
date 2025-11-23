import { IsString, IsNumber, Matches, IsNotEmpty, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export default class  FinancialAllocationRequestDTO{
    
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    public name!: string;

    @IsNotEmpty({ message: 'amount is required' })
    @IsNumber({ allowNaN: false }, { message: 'amount must be a number' })
    public amount!: number;

    @IsString({ message: 'allocationDate must be a string' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public allocationDate!: string;
}