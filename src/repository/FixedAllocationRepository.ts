import { MySQLDataSource } from "../configs/DataBaseConfig";
import FixedAssetAllocation from "../entities/FixedAssetAllocation";

export default class FixedAssetAllocationRepository {
    
    private ormRepository = MySQLDataSource.getRepository(FixedAssetAllocation);

    public async save(fixedAssetAllocation: FixedAssetAllocation): Promise<FixedAssetAllocation | null>{
        return this.ormRepository.save(fixedAssetAllocation);
    }
}