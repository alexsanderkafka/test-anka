import { Expose } from "class-transformer";

export default class MovementResponseDTO{
    @Expose()
    type!: string;

    @Expose()
    externalId!: string;

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