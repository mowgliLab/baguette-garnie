import { ToppingEntity } from '../entyties/topping.entity';

export class ToppingModel {
    public id: number;
    public name: string;
    public price: number;
    public orderNumber: number;

    public static fromEntity(entity: ToppingEntity): ToppingModel {
        const result = new ToppingModel();

        result.id = entity.id;
        result.name = entity.name;
        result.price = entity.price;
        result.orderNumber = entity.orderNumber;

        return result;
    }
}