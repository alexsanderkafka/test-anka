import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import type InsuranceDTO from "../dto/request/InsuranceDTO";
import InsuranceService from "../service/InsuranceService";
import type Insurance from "../entities/Insurance";
import type InsuranceResponseDTO from "../dto/response/InsuranceResponseDTO";

@JsonController("/insurance")
export default class InsuranceController {

    private insuranceService: InsuranceService = new InsuranceService();
    
    @Post("/:personExternalId")
    public async addNewInsurance(@Body() body: InsuranceDTO, @Param("personExternalId") personExternalId: string, @Res() res: any) {
        await this.insuranceService.createNewInsurance(body, personExternalId);

        return res.status(201).json();
    }

    @Get("/:externalId")
    public async findOne(@Param("externalId") externalId: string, @Res() res: any) {
        const result: InsuranceResponseDTO = await this.insuranceService.getOneInsurance(externalId);
        
        return res.status(200).json(result);
    }
        
    @Get("/all/:personExternalId")
    public async findAll(@Param("personExternalId") personExternalId: string, @Res() res: any, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false}) limit: number = 10) {
        const result: InsuranceResponseDTO[] = await this.insuranceService.getAllInsuranceByPersonExternalId(personExternalId, page, limit);
        
        return res.status(200).json(result);
    }
       
    @Put("/:externalId")
    public async update(@Param("externalId") externalId: string, @Body() body: InsuranceDTO, @Res() res: any) {
        const result: InsuranceResponseDTO = await this.insuranceService.updateOneInsurance(externalId, body);

        return res.status(200).json(result);
    }
        
    @Delete("/:externalId")
    public async delete(@Param("externalId") externalId: string, @Res() res: any) {
        await this.insuranceService.deleteOne(externalId);

        return res.status(204).json();
    }
}