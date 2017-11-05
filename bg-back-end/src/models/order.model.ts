import { SandwichModel } from './sandwich.model';
import { OrderEntity } from '../entyties/order.entity';
import { OrderRowEntity } from '../entyties/order-row.entity';
import { UserModel } from './user.model';
import { SandwichUtil } from '../utils/sandwich.util';

import * as _ from 'lodash';

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
        result.totalPrice = _.ceil(result.totalPrice, 2);

        return result;
    }

    public static toEntity(model: OrderModel, user?: UserModel): OrderEntity {
        const result = new OrderEntity();

        result.id = model.id;
        if (!model.id) {
            // If no id, it is a new order, so we can set a new date and open status.
            result.date = new Date();
            result.status = OrderEntity.statusEnum[0];

        } else {
            result.date = model.date;
        }

        if (user) {
            result.user = UserModel.toEntity(user);
        }

        return result;
    }

}

export class OrderedSandwichModel extends SandwichModel {
    public quantity: number;
    public sandwichSize: number;

    public static fromRowEntity(entity: OrderRowEntity): OrderedSandwichModel {
        let result: OrderedSandwichModel;

        if (entity.sandwich) {
            result = SandwichModel.fromEntity(entity.sandwich) as OrderedSandwichModel;
        } else {
            result = new OrderedSandwichModel();
        }

        result.price = entity.unitPrice || result.price;
        result.quantity = entity.quantity;
        result.sandwichSize = entity.sandwichSize;

        return result;
    }

    public static toRowEntity(model: OrderedSandwichModel, orderId?: number): OrderRowEntity {
        const result = new OrderRowEntity();

        result.sandwichId = model.id;
        result.orderId = orderId;
        result.unitPrice = SandwichUtil.computeSandwichPrice(model, model.sandwichSize);
        result.quantity = model.quantity;
        result.sandwichSize = model.sandwichSize;

        return result;
    }

}
