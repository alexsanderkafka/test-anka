import { Expose, Type } from "class-transformer";
import PersonReponseDTO from "./PersonResponseDTO";

export default class HistorySimulationResponseDTO{
    @Expose()
    externalId!: string;

    @Expose()
    name!: string;

    @Expose()
    tax!: string;

    @Expose()
    start_date!: string;

    @Expose()
    @Type(() => PersonReponseDTO)
    person!: PersonReponseDTO;
}