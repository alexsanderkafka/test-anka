import { MySQLDataSource } from "../configs/DataBaseConfig";
import FinancialAllocation from "../entities/FinancialAllocation";

export default class FinancialAllocationRepository {

    private orm = MySQLDataSource.getRepository(FinancialAllocation);

    public async save(financialAllocation: FinancialAllocation): Promise<FinancialAllocation> {
        return this.orm.save(financialAllocation);
    }

}