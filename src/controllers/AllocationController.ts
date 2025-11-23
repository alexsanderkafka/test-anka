import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import AllocationService from "../service/AllocationService";
import type AllocationResponseDTO from "../dto/response/AllocationResponseDTO";
import FixedAssetAllocationRequestDTO from "../dto/request/FixedAssetAllocationRequestDTO";
import FinancialAllocationRequestDTO from "../dto/request/FinancialAllocationRequestDTO";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import ValidatorError from "../errors/ValidatorError";

@JsonController('/allocation')
export default class AllocationController {

    private allocationService: AllocationService = new AllocationService();

    @Post("/financial/:personExternalId")
    public async addNewFinancialAllocation(@Body({ validate: false }) body: FinancialAllocationRequestDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        const errors = await validate(plainToInstance(FinancialAllocationRequestDTO, body));
                
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
        
            throw new ValidatorError(errorMessages.join(', '));
        }

        await this.allocationService.createNewFinancialAllocation(body, personExternalId);
        
        return res.status(201).json({ message: "Financial allocation created successfully" });
    }

    @Post("/fixed-asset/:personExternalId")
    public async addNewFixedAssetAllocation(@Body({ validate: false }) body: FixedAssetAllocationRequestDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        const errors = await validate(plainToInstance(FixedAssetAllocationRequestDTO, body));
                
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
        
            throw new ValidatorError(errorMessages.join(', '));
        }

        await this.allocationService.createNewFixedAssetAllocation(body, personExternalId)

        return res.status(201).json({ message: "Fixed allocation created successfully" });
    }

    @Get("/:externalId")
    public async findOne(@Param("externalId") externalId: string, @Res() res: any) {
        const dto: AllocationResponseDTO = await this.allocationService.getOneAllocationByExternalId(externalId);
        
        return res.status(200).json(dto);
    }
 
    @Get("/all/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false,}) limit: number = 10,  @Res() res: any) {
        const dto: AllocationResponseDTO[] = await this.allocationService.getAllAllocationsByPersonExternalId(personExternalId, page, limit);

        return res.status(200).json(dto);
    }
}