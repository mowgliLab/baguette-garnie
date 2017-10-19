import { ToppingEntity } from '../entyties/topping.entity';

export class ToppingModel {
    public id: number;
    public name: string;
    public price: number;
    public orderNumber: number;
    public type: number;

    public static fromEntity(entity: ToppingEntity): ToppingModel {
        const result = new ToppingModel();

        result.id = entity.id;
        result.name = entity.name;
        result.price = entity.price;
        result.orderNumber = entity.orderNumber;
        result.type = entity.type;

        return result;
    }

    public static toEntity(model: ToppingModel): ToppingEntity {
        const result = new ToppingEntity();

        result.id = model.id;
        result.name = model.name;
        result.price = model.price;
        result.orderNumber = model.orderNumber;
        result.type = model.type;

        return result;
    }
}