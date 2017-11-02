import { getRepository } from 'typeorm';
import { OrderedSandwichModel, OrderModel } from '../models/order.model';
import { OrderEntity } from '../entyties/order.entity';
import { UserModel } from '../models/user.model';
import { SandwichEntity } from '../entyties/sandwich.entity';

import * as _ from 'lodash';
import { OrderRowEntity } from '../entyties/order-row.entity';

export class OrderBl {

    public getOrders(): Promise<Array<OrderModel>> {
        const orderRepository = getRepository(OrderEntity);
        return orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.orderRows', 'row')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('row.sandwich', 'sandwich')
            .leftJoinAndSelect('sandwich.toppings', 'topping')
            .leftJoinAndSelect('sandwich.bread', 'bread')
            .getMany().then(orders => {
                const result = [];

                for (const order of orders) {
                    result.push(OrderModel.fromEntity(order));
                }

                return result;
            });
    }

    public getOrdersForUser(userId: number): Promise<Array<OrderModel>> {
        const orderRepository = getRepository(OrderEntity);
        return orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.orderRows', 'row')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('row.sandwich', 'sandwich')
            .leftJoinAndSelect('sandwich.toppings', 'topping')
            .leftJoinAndSelect('sandwich.bread', 'bread')
            .where(`user.id = ${userId}`).getMany().then(orders => {
                const result = [];

                for (const order of orders) {
                    result.push(OrderModel.fromEntity(order));
                }

                return result;
            });
    }

    public createOrder(order: OrderModel, user: UserModel): Promise<OrderModel> {
        // create correct entity with relation.
        const orderEntity = OrderModel.toEntity(order, UserModel.toEntity(user));

        // update entity
        const orderRepository = getRepository(OrderEntity);
        return orderRepository
            .save(orderEntity)
            .then(orderResult => {
                // refresh sandwich from database to recompute prices.
                const sandwichQB = getRepository(SandwichEntity).createQueryBuilder('sandwich');
                return Promise.resolve(sandwichQB.leftJoinAndSelect('sandwich.toppings', 'topping')
                    .leftJoinAndSelect('sandwich.bread', 'bread')
                    .where('sandwich.id in (:sandwichIds)', {sandwichIds: _.map(order.sandwiches, sand => sand.id)})
                    .getMany().then((sandwichList: SandwichEntity[]) => {

                        // save RowOrders
                        const rowOrders = [];
                        for (const sand of order.sandwiches) {
                            const sandEntity = _.find(sandwichList, s => s.id === sand.id);
                            sand.bread = sandEntity.bread;
                            sand.toppings = sandEntity.toppings;
                            rowOrders.push(OrderedSandwichModel.toRowEntity(sand, orderResult.id));
                        }
                        return getRepository(OrderRowEntity).save(rowOrders);

                    }).then(rowOrders => {
                        orderResult.orderRows = rowOrders;
                        return orderResult;
                        // return OrderModel.fromEntity(orderResult);
                    }));
            }).then(result => {
                const test = OrderModel.fromEntity(result);
                console.log('test', test);
                return test;
            });
    }

}
