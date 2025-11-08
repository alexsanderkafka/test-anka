import { MySQLDataSource } from "../configs/DataBaseConfig";
import Allocation from "../entities/Allocation";

export default class AllocationRepository{

    private ormRepository = MySQLDataSource.getRepository(Allocation);

    public async save(allocation: Allocation): Promise<Allocation> {
        return this.ormRepository.save(allocation);
    }
}