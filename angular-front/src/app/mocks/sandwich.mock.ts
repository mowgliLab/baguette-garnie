import { SandwichModel } from '../models/sandwich.model';

export const SANDWICH: SandwichModel = {
    id: 1,
    name: 'Dagobert',
    description: 'Une délicieuse baguette ornée de jambon/fromage et de crudités.',
    imageSrc: 'http://www.pointchaud.be/images/i_products/Medium_Dagobert.jpg',
    orderNumber: null,
    price: 3.15,
    toppings: [{
        id: 1,
        name: 'Jambon',
        orderNumber: undefined,
        price: 0.5
    }, {
        id: 2,
        name: 'Fromage',
        orderNumber: undefined,
        price: 0.5
    }, {
        id: 3,
        name: 'Salade',
        orderNumber: undefined,
        price: 0.5
    }, {
        id: 4,
        name: 'Cornichons',
        orderNumber: undefined,
        price: 0.5
    }],
    bread: {
        id: 3,
        name: 'Pain bagnard',
        description: 'Un délicieux pain plein de céréales',
        orderNumber: undefined,
        price: 1.5
    }
};
