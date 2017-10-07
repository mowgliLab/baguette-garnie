import { BreadModel } from './bread.model';
import { ToppingModel } from './topping.model';

export class SandwichModel {
    public static readonly sizeValues = {
        1: {name: '1/4', value: 0.25},
        2: {name: '1/2', value: 0.5},
        3: {name: '3/4', value: 0.75},
        4: {name: 'baguette entière', value: 1}
    };

    public id: number;
    public name: string;
    public description: string;
    public imageSrc: string;
    public orderNumber: number;
    public price: number;

    public bread: BreadModel;
    public toppings: ToppingModel[];
}


