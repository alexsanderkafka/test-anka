import type MovementDTO from "../dto/request/MovementDTO";
import MovementResponseDTO from "../dto/response/MovementResponseDTO";
import Movement from "../entities/Movement";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import Mapper from "../mapper/Mapper";
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

    public async getOneMovement(externalId: string): Promise<MovementResponseDTO>{
        const movement: Movement | null = await this.movementRepository.findOneByExternalId(externalId);

        if(!movement){
            throw new NotFoundEntityError("Movement not found");
        }

        return Mapper.toResponse(MovementResponseDTO, movement);
    }

    public async getAllMovementsByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<MovementResponseDTO[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        }

        const movements: Movement[] = await this.movementRepository.findAllByPersonExternalId(personExternalId, page, limit);

        return Mapper.toResponseList(MovementResponseDTO, movements);
    }

    public async updateOneInsurance(externalId: string, dto: MovementDTO): Promise<MovementResponseDTO>{
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

        const savedMovement: Movement = await this.movementRepository.save(movement);

        return Mapper.toResponse(MovementResponseDTO, savedMovement);
    }

    public async deleteOne(externalId: string){
        const movement: Movement | null = await this.movementRepository.findOneByExternalId(externalId);

        if(!movement){
            throw new NotFoundEntityError("This movement not found");
        }

        await this.movementRepository.deleteOneByExternalId(externalId);
    }
}