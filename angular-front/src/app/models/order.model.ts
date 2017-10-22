import { SandwichModel } from './sandwich.model';

export class OrderModel {
    public id: number;
    public date: Date;
    // public totalPrice: number;

    get totalPrice() {
        let total = 0;
        for (const sand of this.sandwiches) {
            total += sand.price * sand.quantity;
        }
        return total;
    }

    public sandwiches: Array<OrderedSandwichModel>;

    constructor() {
        if (!this.date) { this.date = new Date(); }
        if (!this.sandwiches) { this.sandwiches = []; }
    }
}

export class OrderedSandwichModel extends SandwichModel {
    public quantity: number;
    public sandwichSize: number;
}
