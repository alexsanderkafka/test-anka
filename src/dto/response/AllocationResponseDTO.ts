import { Expose, Type} from "class-transformer";
import FinancialAllocation from "../../entities/FinancialAllocation";
import type FixedAssetAllocation from "../../entities/FixedAssetAllocation";
import FinancialAllocationResponseDTO from "./FinancialAllocationResponseDTO";
import FixedAssetAllocationResponseDTO from "./FixedAssetAllocationResponseDTO";
import PersonResponseDTO from "./PersonResponseDTO";

export default class AllocationResponseDTO{
    @Expose()
    externalId!: string;

    @Expose()
    name!: string;

    @Expose()
    type!: string;

    @Expose()
    @Type(() => PersonResponseDTO)
    person!: PersonResponseDTO;

    @Expose()
    @Type(() => FinancialAllocationResponseDTO)
    financialAllocation?: FinancialAllocation | null;

    @Expose()
    @Type(() => FixedAssetAllocationResponseDTO)
    fixedAssetAllocation?: FixedAssetAllocation | null;
}