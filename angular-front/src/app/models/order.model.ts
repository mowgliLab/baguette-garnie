import { SandwichModel } from './sandwich.model';

export class OrderModel {

    public static readonly statusValues = {
        open: 'open',
        closed: 'closed',
        canceled: 'canceled'
    };

    public id: number;
    public date: Date;
    public status: string;

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
