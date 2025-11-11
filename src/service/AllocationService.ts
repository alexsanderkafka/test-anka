import { All } from "routing-controllers";
import type FinancialAllocationDTO from "../dto/FinancialAllocationDTO";
import Allocation from "../entities/Allocation";
import type Person from "../entities/Person";
import NotFoundEntityError from "../errors/NotFoundEntityError";
import FinancialAllocationRepository from "../repository/FinancialAllocationRepository";
import PersonRepository from "../repository/PersonRepository";
import AllocationRepository from "../repository/AllocationRepository";
import FinancialAllocation from "../entities/FinancialAllocation";
import type FixedAssetAllocationDTO from "../dto/FixedAssetAllocationDTO";
import FixedAssetAllocation from "../entities/FixedAssetAllocation";
import FixedAssetAllocationRepository from "../repository/FixedAllocationRepository";
import { start } from "repl";
import Logger from "../configs/LoggerConfig";

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

    public async getAllocationByExternalId(externalId: string): Promise<Allocation> {
        const allocation: Allocation | null = await this.allocationRepository.findByExternalId(externalId);

        Logger.info(`Fetched allocation: ${JSON.stringify(allocation)}`);

        if(!allocation){
            throw new NotFoundEntityError('Allocation not found');
        }

        return allocation;
    }

    public async getAllAllocationsByPersonExternalId(personExternalId: string, page: number, limit: number): Promise<Allocation[]>{
        const person: Person | null = await this.personRepository.findByExternalId(personExternalId);

        if(!person){
            throw new NotFoundEntityError('User not found');
        }

        return this.allocationRepository.findAllByPersonExternalId(personExternalId, page, limit);
    }
    
}