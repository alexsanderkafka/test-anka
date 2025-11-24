import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import HistorySimulationService from "../service/HistorySimulationService";
import type HistorySimulationResponseDTO from "../dto/response/HistorySimulationResponseDTO";
import ValidatorError from "../errors/ValidatorError";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import HistorySimulationRequestDTO from "../dto/request/HistorySimulationRequestDTO";

@JsonController("/history-simulation")
export default class HistorySimulationController {

    private historySimulationService: HistorySimulationService = new HistorySimulationService();
    
    @Post("/:personExternalId")
    public async addNewAssetProjection(@Body({ validate: false }) body: HistorySimulationRequestDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {

        const errors = await validate(plainToInstance(HistorySimulationRequestDTO, body));
                
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
        
            throw new ValidatorError(errorMessages.join(', '));
        }
        
        const result: HistorySimulationResponseDTO = await this.historySimulationService.createNewHistorySimulation(body, personExternalId);

        return res.status(201).json(result);
    }
    
    @Get("/:externalId")
    public async findOne(@Param("externalId") externalId: string, @Res() res: any) {
        const result: HistorySimulationResponseDTO = await this.historySimulationService.getOneHistorySimulation(externalId);

        return res.status(200).json(result)
    }

    @Get("/all/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string, @Res() res: any, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false,}) limit: number = 10) {
        const result: HistorySimulationResponseDTO[] = await this.historySimulationService.getAllHistorySimulation(personExternalId, page, limit);

        return res.status(200).json(result);
    }
    
    @Delete("/:externalId")
    public async delete(@Param("externalId") externalId: string, @Res() res: any) {

        await this.historySimulationService.deleteByExternalId(externalId);

        return res.status(204).json();
    }
}