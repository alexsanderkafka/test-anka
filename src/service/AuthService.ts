import type PersonDTO from "../dto/PersonDTO";
import Person from "../entities/Person";
import PersonRepository from "../repository/PersonRepository";

export default class AuthService{

    private personRepository: PersonRepository = new PersonRepository();

    public async createUser(dto: PersonDTO): Promise<void>{
        //create user logic for cript password and save user to database

        const newPerson = new Person(
            dto.name,
            dto.email,
            dto.password
        );

        return this.personRepository.save(newPerson);

    }
}