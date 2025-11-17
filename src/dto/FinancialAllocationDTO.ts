import { IsString, IsNumber, Matches, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export default class  FinancialAllocationDTO{
    
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    public amount!: number;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public allocationDate!: string;
}