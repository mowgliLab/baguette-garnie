import { BreadModel } from './bread.model';
import { ToppingModel } from './topping.model';

export class SandwichModel {
    public id: number;
    public name: string;
    public description: string;
    public imageSrc: string;
    public orderNumber: number;
    public price: number;

    public bread: BreadModel;
    public toppings: ToppingModel[];
}
