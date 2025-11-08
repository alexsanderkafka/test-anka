import { MySQLDataSource } from "../configs/DataBaseConfig";
import Person from "../entities/Person";

export default class PersonRepository {

    private ormRepository = MySQLDataSource.getRepository(Person);

    public async save(person: Person): Promise<any> {
        return this.ormRepository.save(person);
    }

    public async findByEmail(email: string): Promise<Person | null> {
        return this.ormRepository.findOne({
            where: { email }
        });
    }
}