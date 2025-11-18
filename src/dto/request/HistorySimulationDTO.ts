import { IsString, IsNumber, Matches } from 'class-validator';

export default class HistorySimulationDTO{
    @IsString()
    public name!: string;

    @IsNumber()
    public tax!: number;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'allocationDate must be in YYYY-MM-DD format',
    })
    public startDate!: string;
}