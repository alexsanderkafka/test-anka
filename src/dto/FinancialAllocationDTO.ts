import { IsString, IsNumber, Matches } from 'class-validator';

export default class  FinancialAllocationDTO{
    @IsString()
    public name!: string;

    @IsNumber()
    public amount!: number;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public allocationDate!: string;
}