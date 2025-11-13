import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import type FinancialAllocationDTO from "../dto/FinancialAllocationDTO";
import AllocationService from "../service/AllocationService";
import type FixedAssetAllocationDTO from "../dto/FixedAssetAllocationDTO";

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
    public async findOne(@Param("externalId") externalId: string, @Res() res: any) 
    {
        const dto = await this.allocationService.getOneAllocationByExternalId(externalId);

        //criar DTO de res
        //resolver o problema do null na relação
        
        return res.status(200).json(dto);
    }
 
    @Get("/all/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false,}) limit: number = 10,  @Res() res: any) {

        const dto = await this.allocationService.getAllAllocationsByPersonExternalId(personExternalId, page, limit);

        //criar DTO de res
        //resolver o problema do null na relação

        return res.status(200).json(dto);
    }
}