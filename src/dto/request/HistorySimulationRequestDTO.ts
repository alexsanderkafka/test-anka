import { IsString, IsNumber, Matches, IsNotEmpty } from 'class-validator';

export default class HistorySimulationRequestDTO{
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name is required' })
    public name!: string;

    @IsNumber({}, { message: 'tax must be a number' })
    @IsNotEmpty({ message: 'tax is required' })
    public tax!: number;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'startDate must be in YYYY-MM-DD format',
    })
    @IsNotEmpty({ message: 'startDate is required' })
    public startDate!: string;
}