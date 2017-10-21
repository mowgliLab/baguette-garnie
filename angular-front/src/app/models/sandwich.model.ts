import { BreadModel } from './bread.model';
import { ToppingModel } from './topping.model';

export class SandwichModel {
    public static readonly sizeValues = [
        {name: '1/4', value: 0},
        {name: '1/2', value: 1},
        {name: '3/4', value: 2},
        {name: 'baguette entière', value: 3}
    ];

    public id: number;
    public name: string;
    public description: string;
    public imageSrc: string;
    public orderNumber: number;
    public price: number;

    public bread: BreadModel;
    public toppings: ToppingModel[];
}


