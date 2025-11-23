import { Type } from 'class-transformer';
import { IsString, IsNumber, Matches, IsBoolean, IsDate, IsNotIn, IsNotEmpty } from 'class-validator';

export default class FixedAssetAllocationRequestDTO{

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    public name!: string;

    @IsNumber({}, { message: 'value must be a number' })
    @IsNotEmpty({ message: 'value is required' })
    public value!: number;

    @IsBoolean({ message: 'hasFinancing must be a boolean' })
    @IsNotEmpty({ message: 'hasFinancing is required' })
    public hasFinancing!: boolean;

    @IsNumber({}, { message: 'installments must be a number' })
    @IsNotEmpty({ message: 'installments is required' })
    public installments?: number;

    @IsString({ message: 'startDate must be a string' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'startDate must be in YYYY-MM-DD format',
    })
    @IsNotEmpty({ message: 'startDate is required' })
    public startDate!: string;

    @IsNumber({}, { message: 'tax must be a number' })
    @IsNotEmpty({ message: 'tax is required' })
    public tax?: number;

    @IsNumber({}, { message: 'downPayment must be a number' })
    @IsNotEmpty({ message: 'downPayment is required' })
    public downPayment?: number;

}