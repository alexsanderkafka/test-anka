import Logger from "../configs/LoggerConfig";
import type InsuranceDTO from "../dto/InsuranceDTO";
import Insurance from "../entities/Insurance";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import InsuranceRepository from "../repository/InsuranceRepository";
import PersonRepository from "../repository/PersonRepository";

export default class InsuranceService{

    private personRepository: PersonRepository = new PersonRepository();
    private insuranceRepository: InsuranceRepository = new InsuranceRepository();

    public async createNewInsurance(dto: InsuranceDTO, personExternalId: string){
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

        await this.insuranceRepository.save(insurance);    
    }

    public async getOneInsurance(externalId: string): Promise<Insurance>{
        const insurance: Insurance | null = await this.insuranceRepository.findOneByExternalId(externalId);

        if(!insurance){
            throw new NotFoundEntityError("Insurance not found");
        }

        return insurance;
    }

    public async getAllInsuranceByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Insurance[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError("User not found");
        
        }

        return await this.insuranceRepository.findAllByPersonExternalId(personExternalId, page, limit);
    }

    public async updateOneInsurance(externalId: string, dto: InsuranceDTO): Promise<Insurance>{
        let insurance: Insurance | null = await this.insuranceRepository.findOneByExternalId(externalId);

        if(!insurance){
            throw new NotFoundEntityError("Insurance not found");
        }

        insurance.name = dto.name ?? insurance.name;
        insurance.startDate = dto.startDate ? new Date(dto.startDate) : insurance.startDate
        insurance.duration = dto.duration ?? insurance.duration;
        insurance.monthlyValue = dto.monthlyValue ?? insurance.monthlyValue;
        insurance.insuredValue = dto.insuredValue ?? insurance.insuredValue;

        return this.insuranceRepository.save(insurance);
    }

    public async deleteOne(externalId: string){
        const insurance: Insurance | null = await this.insuranceRepository.findOneByExternalId(externalId);

        if(!insurance){
            throw new NotFoundEntityError("Insurance not found");
        }

        await this.insuranceRepository.deleteOneByExternalId(externalId);
    }
}