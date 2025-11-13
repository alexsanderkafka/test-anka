import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import HistorySimulationService from "../service/HistorySimulationService";
import type HistorySimulationDTO from "../dto/HistorySimulationDTO";
import type { HistorySimulation } from "../entities/HistorySimulation";

@JsonController("/history-simulation")
export default class HistorySimulationController {

    private historySimulationService: HistorySimulationService = new HistorySimulationService();
    
    @Post("/:personExternalId")
    public async addNewAssetProjection(@Body() body: HistorySimulationDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        await this.historySimulationService.createNewHistorySimulation(body, personExternalId);

        return res.status(201).json({ message: "History simulation created successfully" });
    }
    
    @Get("/:externalId")
    public async findOne(@Param("externalId") externalId: string, @Res() res: any) {
        //Criar o dto de res
        
        const result: HistorySimulation = await this.historySimulationService.getOneHistorySimulation(externalId);

        return res.status(200).json(result)
    }

    @Get("/all/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string, @Res() res: any, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false,}) limit: number = 10) {
        //Criar o dto de res
        const result: HistorySimulation[] = await this.historySimulationService.getAllHistorySimulation(personExternalId, page, limit);

        return res.status(200).json(result);
    }
    
    @Delete("/:externalId")
    public async delete(@Param("externalId") externalId: string, @Res() res: any) {

        await this.historySimulationService.deleteByExternalId(externalId);

        return res.status(204).json();
    }
}