import type PersonDTO from "../dto/PersonDTO";
import Person from "../entities/Person";
import PersonRepository from "../repository/PersonRepository";
import PasswordEncoder from "../security/PasswordEnconder";

export default class AuthService{

    private personRepository: PersonRepository = new PersonRepository();

    public async createUser(dto: PersonDTO): Promise<void>{
        //create user logic for cript password and save user to database

        const passwordEncoder: string = await PasswordEncoder.hasPassword(dto.password);

        const newPerson = new Person(
            dto.name,
            dto.email,
            passwordEncoder
        );

        //Error handling for duplicate email can be added here

        return this.personRepository.save(newPerson);
    }
}