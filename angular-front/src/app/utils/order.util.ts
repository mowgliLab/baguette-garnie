import { OrderModel } from '../models/order.model';
import * as _ from 'lodash';
import { SandwichUtil } from './sandwich.util';

export class OrderUtil {
    public static computeOrderPrice(order: OrderModel): number {

        if (!order.sandwiches || order.sandwiches.length < 1) { return undefined; }

        let total = 0;
        for (const sand of order.sandwiches) {
            total += SandwichUtil.computeSandwichPrice(sand, sand.sandwichSize) * sand.quantity;
        }
        return total;
    }

    public static computeTotalOrderedSandwiches(order: OrderModel): number {

        if (!order.sandwiches || order.sandwiches.length < 1) { return undefined; }

        return _.sumBy(order.sandwiches, s => s.quantity);
    }
}
