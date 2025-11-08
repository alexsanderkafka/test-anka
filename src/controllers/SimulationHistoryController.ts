import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";

@JsonController("/simulation-history")
export default class SimulationHistoryController {

    @Post()
    public async create(@Body() body: any) {
        return { message: "Allocation created successfully", data: body };
    }
        
    @Get()
    public async findAll() {
        return { message: "All allocations fetched successfully", data: [] };
    }
        
    @Get("/:id")
    public async findOne(@Param("id") id: number) {
        return { message: `Allocation ${id} fetched successfully`, data: { id } };
    }
        
    @Put("/:id")
    public async update(@Param("id") id: number, @Body() body: any) {
        return { message: `Allocation ${id} updated successfully`, data: body };
    }
        
    @Delete("/:id")
    public async delete(@Param("id") id: number) {
        return { message: `Allocation ${id} deleted successfully` };
    }
}