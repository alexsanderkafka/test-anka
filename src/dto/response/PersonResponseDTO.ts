import { Expose } from "class-transformer";

export default class PersonReponseDTO{
    @Expose()
    externalId!: string;

    @Expose()
    name!: string;

    @Expose()
    status!: string;
}