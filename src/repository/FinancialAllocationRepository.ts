import { MySQLDataSource } from "../configs/DataBaseConfig";
import FinancialAllocation from "../entities/FinancialAllocation";

export default class FinancialAllocationRepository {

    private ormRepository = MySQLDataSource.getRepository(FinancialAllocation);

    public async save(financialAllocation: FinancialAllocation): Promise<FinancialAllocation | null> {
        return this.ormRepository.save(financialAllocation);
    }

}