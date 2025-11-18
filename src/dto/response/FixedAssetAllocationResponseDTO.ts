import { Expose } from "class-transformer";

export default class FixedAssetAllocationResponseDTO{
    @Expose()
    value!: number;

    @Expose()
    hasFinancing!: boolean

    @Expose()
    installments!: number;

    @Expose()
    startDate!: Date;

    @Expose()
    endDate!: Date;

    @Expose()
    tax!: number;

    @Expose()
    downPayment!: number;
}