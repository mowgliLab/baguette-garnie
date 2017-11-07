import { SandwichEntity } from '../entyties/sandwich.entity';
import { SandwichOnMenuEntity } from '../entyties/sandwich-on-menu.entity';
import { ToppingModel } from './topping.model';
import { BreadModel } from './bread.model';
import { ToppingEntity } from '../entyties/topping.entity';
import { SandwichUtil } from '../utils/sandwich.util';

export class SandwichModel {
    public id: number;
    public name: string;
    public description: string;
    public imageSrc: string;
    public orderNumber: number;

    public price: number;
    public toppings: ToppingModel[];
    public bread: BreadModel;

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

        result.id = sandwichEntity.id;
        result.name = sandwichEntity.name;
        result.description = sandwichEntity.description;
        result.imageSrc = sandwichEntity.imageSrc;
        result.orderNumber = orderNumber;

        console.log(sandwichEntity);

        if (sandwichEntity.toppings && sandwichEntity.toppings.length > 0) {
            console.log('ADA TEST computePrice');
            if (sandwichEntity.bread) {
                result.price = SandwichUtil.computeSandwichPrice(sandwichEntity);
                result.bread = BreadModel.fromEntity(sandwichEntity.bread);
            }
            result.toppings = [];
            for (const topping of sandwichEntity.toppings) {
                result.toppings.push(ToppingModel.fromEntity(topping));
            }
        }

        return result;
    }

    public static toEntity(model: SandwichModel, isCustom = false): SandwichEntity {
        const result = new SandwichEntity();

        result.id = model.id;
        result.name = model.name;
        result.description = model.description;
        result.imageSrc = model.imageSrc;
        result.isCustom = isCustom;

        result.toppings = [];
        for (const topping of model.toppings) {
            result.toppings.push(ToppingModel.toEntity(topping));
        }
        result.bread = BreadModel.toEntity(model.bread);


        return result;
    }
}
