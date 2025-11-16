import { MySQLDataSource } from "../configs/DataBaseConfig";
import Logger from "../configs/LoggerConfig";
import Movement from "../entities/Movement";

export default class MovementRepository{

    private orm = MySQLDataSource.getRepository(Movement);

    public async save(movement: Movement): Promise<Movement>{
        Logger.warn("Caiu no repository");
        return this.orm.save(movement);
    }

    public async findOneByExternalId(externalId: string): Promise<Movement | null>{
        return await this.orm.findOne({
            where: {externalId}
        });
    }

    public async findAllByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Movement[]>{
        const skip = (page - 1) * limit;

        return await this.orm.find({
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

    public async deleteOneByExternalId(externalId: string){
        await this.orm.delete({externalId});
    }
}