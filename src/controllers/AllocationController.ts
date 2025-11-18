import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import type FinancialAllocationDTO from "../dto/request/FinancialAllocationDTO";
import AllocationService from "../service/AllocationService";
import type FixedAssetAllocationDTO from "../dto/request/FixedAssetAllocationDTO";
import type AllocationResponseDTO from "../dto/response/AllocationResponseDTO";

@JsonController('/allocation')
export default class AllocationController {

    private allocationService: AllocationService = new AllocationService();

    @Post("/financial/:personExternalId")
    public async addNewFinancialAllocation(@Body() body: FinancialAllocationDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        await this.allocationService.createNewFinancialAllocation(body, personExternalId);
        
        return res.status(201).json({ message: "Financial allocation created successfully" });
    }

    @Post("/fixed-asset/:personExternalId")
    public async addNewFixedAssetAllocation(@Body() body: FixedAssetAllocationDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
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