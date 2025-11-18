import { Expose } from "class-transformer";

export default class InsuranceResponseDTO{
    @Expose()
    externalId!: string;

    @Expose()
    name!: string;

    @Expose()
    startDate!: Date;

    @Expose()
    duration!: number;

    @Expose()
    monthlyValue!: number;

    @Expose()
    insuredValue!: number;
}