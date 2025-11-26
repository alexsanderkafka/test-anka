import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res} from "routing-controllers";
import MovementService from "../service/MovementService";
import type MovementResponseDTO from "../dto/response/MovementResponseDTO";
import MovementRequestDTO from "../dto/request/MovementRequestDTO";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import ValidatorError from "../errors/ValidatorError";

@JsonController("/movement")
export default class MovementController {

    private movementService: MovementService = new MovementService();
    
    @Post("/:personExternalId")
    public async addNewMovement(@Body({ validate: false }) body: MovementRequestDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        const errors = await validate(plainToInstance(MovementRequestDTO, body));
                                
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
                        
            throw new ValidatorError(errorMessages.join(', '));
        }

        const result: MovementResponseDTO = await this.movementService.createNewInsurance(body, personExternalId);

        return res.status(201).json(result);
    }   
        
    @Get("/:externalId")
    public async findOne(@Param("externalId") externalId: string, @Res() res: any) {
        const result: MovementResponseDTO = await this.movementService.getOneMovement(externalId);
        
        return res.status(200).json(result);
    }

    @Get("/all/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string, @Res() res: any, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false}) limit: number = 10) {
        const movements: MovementResponseDTO[] = await this.movementService.getAllMovementsByPersonExternalId(personExternalId, page, limit);

        return res.status(200).json(movements);
    }
        
    @Put("/:externalId")
    public async update(@Param("externalId") externalId: string, @Body({ validate: false }) body: MovementRequestDTO, @Res() res: any) {
        const errors = await validate(plainToInstance(MovementRequestDTO, body));
                                
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
                        
            throw new ValidatorError(errorMessages.join(', '));
        }
        
        const result: MovementResponseDTO = await this.movementService.updateOneInsurance(externalId, body);

        return res.status(200).json(result);
    }
        
    @Delete("/:externalId")
    public async delete(@Param("externalId") externalId: string, @Res() res: any) {
        await this.movementService.deleteOne(externalId);
        
        return res.status(204).json();
    }
}