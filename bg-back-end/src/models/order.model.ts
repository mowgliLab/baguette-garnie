import { SandwichModel } from './sandwich.model';
import { OrderEntity } from '../entyties/order.entity';
import { OrderRowEntity } from '../entyties/order-row.entity';

export class OrderModel {


    public id: number;
    public date: Date;
    public totalPrice: number;

    public sandwiches: Array<OrderedSandwichModel>;

    public static fromEntity(entity: OrderEntity): OrderModel {
        const result = new OrderModel();

        result.id = entity.id;
        result.date = entity.date;
        result.sandwiches = [];
        result.totalPrice = 0;

        for (const row of entity.orderRows) {
            const orderSandwich = OrderedSandwichModel.fromRowEntity(row);
            result.sandwiches.push(orderSandwich);
            result.totalPrice += orderSandwich.price * orderSandwich.quantity;
        }


        return result;
    }
}

export class OrderedSandwichModel extends SandwichModel {
    public quantity: number;
    public sandwichSize: number;

    public static fromRowEntity(entity: OrderRowEntity): OrderedSandwichModel {
        const result = SandwichModel.fromEntity(entity.sandwich) as OrderedSandwichModel;

        result.quantity = entity.quantity;
        result.sandwichSize = entity.sandwichSize;

        return result;
    }
}
