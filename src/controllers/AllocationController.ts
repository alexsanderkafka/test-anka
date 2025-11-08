import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Res } from "routing-controllers";
import type FinancialAllocationDTO from "../dto/FinancialAllocationDTO";
import AllocationService from "../service/AllocationService";
import type FixedAssetAllocationDTO from "../dto/FixedAssetAllocationDTO";

@JsonController('/allocation')
export default class AllocationController {

    private allocationService: AllocationService = new AllocationService();

    @Post("/financial/:personExternalId")
    public async addNewFinancialAllocation(@Body() body: FinancialAllocationDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        await this.allocationService.createNewFinancialAllocation(body, personExternalId);
        
        return res.status(200).json({ message: "Financial allocation created successfully" });
    }

    @Post("/fixed-asset/:personExternalId")
    public async addNewFixedAssetAllocation(@Body() body: FixedAssetAllocationDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        
        await this.allocationService.createNewFixedAssetAllocation(body, personExternalId)

        return res.status(200).json({ message: "Fixed allocation created successfully" });
    }

    @Get("/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string) {
        return { message: "All allocations fetched successfully", data: [] };
    }

    @Get("/:externalId")
    public async findOne(@Param("externalId") externalId: string) {
        return { message: `Allocation ${externalId} fetched successfully`, data: { externalId } };
    }

    @Put("/:externalId")
    public async update(@Param("externalId") externalId: string, @Body() body: any) {
        return { message: `Allocation ${externalId} updated successfully`, data: body };
    }

    @Delete("/:externalId")
    public async delete(@Param("externalId") externalId: string) {
        return { message: `Allocation ${externalId} deleted successfully` };
    }
}