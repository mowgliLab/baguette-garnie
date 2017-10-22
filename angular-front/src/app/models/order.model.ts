import { SandwichModel } from './sandwich.model';

export class OrderModel {
    public id: number;
    public date: Date;

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
