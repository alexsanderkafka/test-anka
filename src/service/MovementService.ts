import type MovementDTO from "../dto/MovementDTO";
import Movement from "../entities/Movement";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import MovementRepository from "../repository/MovementRepository";
import PersonRepository from "../repository/PersonRepository";

export default class MovementService{

    private movementRepository: MovementRepository = new MovementRepository();
    private personRepository: PersonRepository = new PersonRepository();
    
    public async createNewInsurance(dto: MovementDTO, personExternalId: string){
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        }

        const movement: Movement = new Movement(
            dto.type,
            dto.amount,
            dto.frequency,
            new Date(dto.startDate),
            dto.description,
            new Date(dto.endDate),
            person
        );

        await this.movementRepository.save(movement);
    }

    public async getOneMovement(externalId: string): Promise<Movement>{
        const movement: Movement | null = await this.movementRepository.findOneByExternalId(externalId);

        if(!movement){
            throw new NotFoundEntityError("Movement not found");
        }

        return movement;
    }

    public async getAllMovementsByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Movement[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        }

        return await this.movementRepository.findAllByPersonExternalId(personExternalId, page, limit);
    }

    public async updateOneInsurance(externalId: string, dto: MovementDTO): Promise<Movement>{
        let movement: Movement | null = await this.movementRepository.findOneByExternalId(externalId);

        if(!movement){
            throw new NotFoundEntityError("Movement not found");
        }

        movement.type = dto.type ?? movement.type;
        movement.amount = dto.amount ?? movement.amount;
        movement.description = dto.description ?? movement.description;
        movement.frequency = dto.frequency ?? movement.frequency;
        movement.startDate = dto.startDate ? new Date(dto.startDate) : movement.startDate;
        movement.endDate = dto.endDate ? new Date(dto.endDate) : movement.endDate;

        return await this.movementRepository.save(movement);
    }

    public async deleteOne(externalId: string){
        const movement: Movement | null = await this.movementRepository.findOneByExternalId(externalId);

        if(!movement){
            throw new NotFoundEntityError("This movement not found");
        }

        await this.movementRepository.deleteOneByExternalId(externalId);
    }
}