import type { DeleteResult } from "typeorm";
import { MySQLDataSource } from "../configs/DataBaseConfig";
import { HistorySimulation } from "../entities/HistorySimulation";

export default class HistorySimulationRepository{

    private orm = MySQLDataSource.getRepository(HistorySimulation);

    public async save(historySimulation: HistorySimulation): Promise<HistorySimulation>{
        return this.orm.save(historySimulation);
    }

    public async findOneByExternalId(externalId: string): Promise<HistorySimulation | null>{
        return this.orm.findOne({
            where: {externalId}
        });
    }

    public async findAllHistorySimulationByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<HistorySimulation[]>{
        const skip = (page - 1) * limit;

        return this.orm.find({
            skip: skip,
            take: limit,
            where: {
                person: {
                    externalId: personExternalId
                }
            },
            relations: ["person"],
            order: {
                id: "ASC"
            }
        });
    }

    public async delete(externalId: string): Promise<DeleteResult>{
        return this.orm.delete({externalId});
    }
}