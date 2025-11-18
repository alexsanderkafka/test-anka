import { Type } from 'class-transformer';
import { IsString, IsNumber, Matches, IsBoolean, IsDate, IsNotIn } from 'class-validator';

export default class FixedAssetAllocationDTO{
    @IsString()        
    public name!: string;

    @IsNumber()
    public value!: number;

    @IsBoolean()
    public hasFinancing!: boolean;

    @IsNumber()
    public installments?: number;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public startDate!: string;

    @IsNumber()
    public tax?: number;

    @IsNumber()
    public downPayment?: number;

}