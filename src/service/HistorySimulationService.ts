import Logger from "../configs/LoggerConfig";
import type HistorySimulationDTO from "../dto/request/HistorySimulationDTO";
import HistorySimulationResponseDTO from "../dto/response/HistorySimulationResponseDTO";
import { HistorySimulation } from "../entities/HistorySimulation";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import Mapper from "../mapper/Mapper";
import HistorySimulationMapper from "../mapper/Mapper";
import HistorySimulationRepository from "../repository/HistorySimulationRepository";
import PersonRepository from "../repository/PersonRepository";

export default class HistorySimulationService{

    private historySimulationRepository: HistorySimulationRepository = new HistorySimulationRepository();
    private personRepository: PersonRepository = new PersonRepository();

    public async createNewHistorySimulation(dto: HistorySimulationDTO, personExternalId: string){

        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        }

        const historySimulation: HistorySimulation = new HistorySimulation(
            dto.name,
            dto.tax,
            new Date(dto.startDate),
            person
        );

        await this.historySimulationRepository.save(historySimulation);        
    }

    public async getOneHistorySimulation(externalId: string): Promise<HistorySimulationResponseDTO>{
        const historySimulation: HistorySimulation | null = await this.historySimulationRepository.findOneByExternalId(externalId);

        if(!historySimulation){
            throw new NotFoundEntityError("History simulation not found");
        }

        return Mapper.toResponse(HistorySimulationResponseDTO, historySimulation);
    }

    public async getAllHistorySimulation(personExternalId: string, page: number, limit: number): Promise<HistorySimulationResponseDTO[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        }

        const historySimulations: HistorySimulation[] = await this.historySimulationRepository.findAllHistorySimulationByPersonExternalId(personExternalId, page, limit);

        return Mapper.toResponseList(HistorySimulationResponseDTO, historySimulations);
    }

    public async deleteByExternalId(externalId: string){
        const historySimulation: HistorySimulation | null = await this.historySimulationRepository.findOneByExternalId(externalId);

        if(!historySimulation){
            throw new NotFoundEntityError("History simulation not found");
        }
        
        await this.historySimulationRepository.delete(externalId);
    }
    
}