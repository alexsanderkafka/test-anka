import { plainToInstance } from "class-transformer";

export default class Mapper{
    public static toResponse<D, E>(dto: new () => D, entity: E): D {
        return plainToInstance(dto, entity, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true
        });
    }

    public static toResponseList<D, E>(dto: new () => D, entities: E[]): D[] {
        return plainToInstance(dto, entities, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true
        });
    }
}