import { MySQLDataSource } from "../configs/DataBaseConfig";
import Allocation from "../entities/Allocation";

export default class AllocationRepository{
    
    private orm = MySQLDataSource.getRepository(Allocation);

    public async save(allocation: Allocation): Promise<Allocation> {
        return this.orm.save(allocation);
    }

    public async findOneByExternalId(externalId: string): Promise<Allocation | null> {
        return this.orm.findOne({
            where: {externalId: externalId},
            relations: ["person", "financialAllocation", "fixedAssetAllocation"]
        });
    }

    public async findAllByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Allocation[]>{
        const skip = (page - 1) * limit;

        return await this.orm.find({
            skip: skip,
            take: limit,
            where: {
                person: {
                    externalId: personExternalId
                }
            },
            relations: ["person", "financialAllocation", "fixedAssetAllocation"],
            order: {
                id: "ASC"
            }
        });
    }
}