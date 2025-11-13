import { MySQLDataSource } from "../configs/DataBaseConfig";
import Person from "../entities/Person";

export default class PersonRepository {

    private orm = MySQLDataSource.getRepository(Person);

    public async save(person: Person): Promise<any> {
        return this.orm.save(person);
    }

    public async findByEmail(email: string): Promise<Person | null> {
        return this.orm.findOne({
            where: { email }
        });
    }

    public async findByExternalId(externalId: string): Promise<Person | null> {
        return this.orm.findOne({
            where: { externalId }
        });
    }
}