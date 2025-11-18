import { Expose } from "class-transformer";

export default class FinancialAllocationResponseDTO{
    @Expose()
    amount!: number;

    @Expose()
    allocationDate!: Date;
}