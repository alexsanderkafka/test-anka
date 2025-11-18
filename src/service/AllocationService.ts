import type FinancialAllocationDTO from "../dto/request/FinancialAllocationDTO";
import Allocation from "../entities/Allocation";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import FinancialAllocationRepository from "../repository/FinancialAllocationRepository";
import PersonRepository from "../repository/PersonRepository";
import FinancialAllocation from "../entities/FinancialAllocation";
import type FixedAssetAllocationDTO from "../dto/request/FixedAssetAllocationDTO";
import FixedAssetAllocation from "../entities/FixedAssetAllocation";
import FixedAssetAllocationRepository from "../repository/FixedAllocationRepository";
import Logger from "../configs/LoggerConfig";
import AllocationRepository from "../repository/AllocationRepository";
import AllocationResponseDTO from "../dto/response/AllocationResponseDTO";
import Mapper from "../mapper/Mapper";

export default class AllocationService{
    private personRepository = new PersonRepository();
    private allocationRepository = new AllocationRepository();
    private financialAllocationRepository =  new FinancialAllocationRepository()
    private fixedAssetAllocationRepository =  new FixedAssetAllocationRepository()

    public async createNewFinancialAllocation(financialAllocationDto: FinancialAllocationDTO, personExternalId: string) {

        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError('User not found');
        }

        let allocation: Allocation = new Allocation(
            financialAllocationDto.name,
            "FINANCEIRA",
            person
        );

        allocation = await this.allocationRepository.save(allocation);

        const financialAllocation: FinancialAllocation = new FinancialAllocation(
            financialAllocationDto.amount,
            new Date(financialAllocationDto.allocationDate),
            allocation
        );

        this.financialAllocationRepository.save(financialAllocation);
    }

    public async createNewFixedAssetAllocation(fixedAssetDto: FixedAssetAllocationDTO, personExternalId: string) {
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError('User not found');
        }

        let allocation: Allocation = new Allocation(
            fixedAssetDto.name,
            "IMOBILIZADA",
            person
        );

        allocation = await this.allocationRepository.save(allocation);

        let fixedAssetAllocation: FixedAssetAllocation = new FixedAssetAllocation(
            fixedAssetDto.value,
            fixedAssetDto.hasFinancing,
            new Date(fixedAssetDto.startDate),
            allocation,
            null,
            fixedAssetDto.tax,
            fixedAssetDto.installments,
            fixedAssetDto.downPayment,
        );


        if(fixedAssetDto.hasFinancing){
            let endDate = new Date(fixedAssetDto.startDate);
            endDate.setMonth(endDate.getMonth() + (fixedAssetDto.installments!));

            fixedAssetAllocation.setEndDate(endDate);
        }

        this.fixedAssetAllocationRepository.save(fixedAssetAllocation);
    }

    public async getOneAllocationByExternalId(externalId: string): Promise<AllocationResponseDTO> {
        const allocation: Allocation | null = await this.allocationRepository.findByExternalId(externalId);

        Logger.info(`Fetched allocation: ${JSON.stringify(allocation)}`);

        if(!allocation){
            throw new NotFoundEntityError('Allocation not found');
        }

        return Mapper.toResponse(AllocationResponseDTO, allocation);
    }

    public async getAllAllocationsByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<AllocationResponseDTO[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError('User not found');
        }

        const allocations: Allocation[] = await this.allocationRepository.findAllByPersonExternalId(personExternalId, page, limit);

        return Mapper.toResponseList(AllocationResponseDTO, allocations);
    }
    
}