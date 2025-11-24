import Logger from "../configs/LoggerConfig";
import type InsuranceRequestDTO from "../dto/request/InsuranceRequestDTO";
import InsuranceResponseDTO from "../dto/response/InsuranceResponseDTO";
import Insurance from "../entities/Insurance";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import Mapper from "../mapper/Mapper";
import InsuranceRepository from "../repository/InsuranceRepository";
import PersonRepository from "../repository/PersonRepository";

export default class InsuranceService{

    private personRepository: PersonRepository = new PersonRepository();
    private insuranceRepository: InsuranceRepository = new InsuranceRepository();

    public async createNewInsurance(dto: InsuranceRequestDTO, personExternalId: string): Promise<InsuranceResponseDTO>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        }

        const insurance: Insurance = new Insurance(
            dto.name,
            new Date(dto.startDate),
            dto.duration,
            dto.monthlyValue,
            dto.insuredValue,
            person
        );

        const result: Insurance = await this.insuranceRepository.save(insurance);    

        return Mapper.toResponse(InsuranceResponseDTO, result);
    }

    public async getOneInsurance(externalId: string): Promise<InsuranceResponseDTO>{
        const insurance: Insurance | null = await this.insuranceRepository.findOneByExternalId(externalId);

        if(!insurance){
            throw new NotFoundEntityError("Insurance not found");
        }

        return Mapper.toResponse(InsuranceResponseDTO, insurance);
    }

    public async getAllInsuranceByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<InsuranceResponseDTO[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        
        }

        const insurances: Insurance[] = await this.insuranceRepository.findAllByPersonExternalId(personExternalId, page, limit);

        return Mapper.toResponseList(InsuranceResponseDTO, insurances);
    }

    public async updateOneInsurance(externalId: string, dto: InsuranceRequestDTO): Promise<InsuranceResponseDTO>{
        let insurance: Insurance | null = await this.insuranceRepository.findOneByExternalId(externalId);

        if(!insurance){
            throw new NotFoundEntityError("Insurance not found");
        }

        insurance.name = dto.name ?? insurance.name;
        insurance.startDate = dto.startDate ? new Date(dto.startDate) : insurance.startDate
        insurance.duration = dto.duration ?? insurance.duration;
        insurance.monthlyValue = dto.monthlyValue ?? insurance.monthlyValue;
        insurance.insuredValue = dto.insuredValue ?? insurance.insuredValue;

        const updatedInsurance: Insurance = await this.insuranceRepository.save(insurance);

        return Mapper.toResponse(InsuranceResponseDTO, updatedInsurance);
    }

    public async deleteOne(externalId: string){
        const insurance: Insurance | null = await this.insuranceRepository.findOneByExternalId(externalId);

        if(!insurance){
            throw new NotFoundEntityError("Insurance not found");
        }

        await this.insuranceRepository.deleteOneByExternalId(externalId);
    }
}