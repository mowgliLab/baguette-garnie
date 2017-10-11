import { SandwichEntity } from '../entyties/sandwich.entity';
import { SandwichOnMenuEntity } from '../entyties/sandwich-on-menu.entity';
import { ToppingModel } from './topping.model';
import { BreadModel } from './bread.model';

export class SandwichModel {
    public id: number;
    public name: string;
    public description: string;
    public imageSrc: string;
    public orderNumber: number;

    public price: number;
    public toppings: ToppingModel[];
    public bread: BreadModel;

    public static fromDbRow(dbRow: any): SandwichModel {
        console.log(dbRow);
        return <SandwichModel> {
            id: dbRow.sandwich_id,
            name: dbRow.sandwich_name,
            description: dbRow.sandwich_description,
            imageSrc: dbRow.sandwich_image_src,
            orderNumber: dbRow.sandwich_order_number,
            price: dbRow.sandwich_price
        };
    }

    public static fromEntity(entity: SandwichEntity | SandwichOnMenuEntity): SandwichModel {
        const result = new SandwichModel();
        let orderNumber: number;
        let sandwichEntity: SandwichEntity;

        if (entity instanceof SandwichOnMenuEntity) {
            orderNumber = entity.orderNumber;
            sandwichEntity = entity.sandwich;
        } else {
            sandwichEntity = entity;
        }
        console.log(sandwichEntity);

        result.id = sandwichEntity.id;
        result.name = sandwichEntity.name;
        result.description = sandwichEntity.description;
        result.imageSrc = sandwichEntity.imageSrc;
        result.orderNumber = orderNumber;
        result.price = 5.25; // TODO Implement!!!

        if (sandwichEntity.toppings && sandwichEntity.toppings.length > 0) {
            result.toppings = [];
            for (const topping of sandwichEntity.toppings) {
                result.toppings.push(ToppingModel.fromEntity(topping));
            }
        }

        result.bread = BreadModel.fromEntity(sandwichEntity.bread);

        return result;
    }
}
