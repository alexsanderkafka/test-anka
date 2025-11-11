import { MySQLDataSource } from "../configs/DataBaseConfig";
import Allocation from "../entities/Allocation";

export default class AllocationRepository{
    
    private ormRepository = MySQLDataSource.getRepository(Allocation);

    public async save(allocation: Allocation): Promise<Allocation> {
        return this.ormRepository.save(allocation);
    }

    public async findByExternalId(externalId: string): Promise<Allocation | null> {
        return this.ormRepository.findOne({
            where: {externalId: externalId},
            relations: ["person", "financialAllocation", "fixedAssetAllocation"]
        });
    }

    public async findAllByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Allocation[]>{
        const skip = (page - 1) * limit;

        return await this.ormRepository.find({
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