import { Expose } from "class-transformer";

export default class MovementResponseDTO{
    @Expose()
    externalId!: string;
    
    @Expose()
    type!: string;

    @Expose()
    amount!: number;

    @Expose()
    description!: string;

    @Expose()
    frequency!: string;

    @Expose()
    startDate!: Date;

    @Expose()
    endDate!: Date;
}