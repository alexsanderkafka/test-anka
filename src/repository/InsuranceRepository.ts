import { MySQLDataSource } from "../configs/DataBaseConfig";
import Insurance from "../entities/Insurance";

export default class InsuranceRepository{

    private orm = MySQLDataSource.getRepository(Insurance);

    public async save(insurance: Insurance): Promise<Insurance>{
        return this.orm.save(insurance);
    }

    public async findOneByExternalId(externalId: string): Promise<Insurance | null>{
        return this.orm.findOne({
            where: {externalId}
        });
    }

    public async findAllByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Insurance[]>{
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

    public async deleteOneByExternalId(externalId: string){
        await this.orm.delete({externalId});
    }
}