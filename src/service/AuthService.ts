import type PersonRequestDTO from "../dto/request/PersonRequestDTO";
import Person from "../entities/Person";
import ExistingUserError from "../errors/ExistingUserError";
import PersonRepository from "../repository/PersonRepository";
import PasswordEncoder from "../security/PasswordEnconder";

export default class AuthService{

    private personRepository: PersonRepository = new PersonRepository();

    public async createUser(dto: PersonRequestDTO): Promise<void>{
        const existingPerson: Person | null = await this.personRepository.findByEmail(dto.email);

        if(existingPerson){
            throw new ExistingUserError('User with this email already exists');
        }

        const passwordEncoder: string = await PasswordEncoder.hasPassword(dto.password);

        const newPerson = new Person(
            dto.name,
            dto.email,
            passwordEncoder
        );
 

        return this.personRepository.save(newPerson);
    }
}