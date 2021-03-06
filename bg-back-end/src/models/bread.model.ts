import { BreadEntity } from '../entyties/bread.entity';

export class BreadModel {

    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public orderNumber: number;

    public static fromEntity(entity: BreadEntity) {
        const result = new BreadModel();

        result.id = entity.id;
        result.name = entity.name;
        result.description = entity.description;
        result.price = entity.price;
        result.orderNumber = entity.orderNumber;

        return result;
    }

    public static toEntity(model: BreadModel): BreadEntity {
        const result = new BreadEntity();

        result.id = model.id;
        result.name = model.name;
        result.description = model.description;
        result.price = model.price;
        result.orderNumber = model.orderNumber;

        return result;
    }

}