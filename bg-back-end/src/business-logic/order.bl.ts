import { MenuModel } from '../models/menu.model';
import { MenuEntity } from '../entyties/menu.entity';
import { getRepository } from 'typeorm';
import { OrderModel } from '../models/order.model';
import { OrderEntity } from '../entyties/order.entity';

export class OrderBl {

    public getOrders (): Promise<Array<OrderModel>> {
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

    public getOrdersForUser (userId: number): Promise<Array<OrderModel>> {
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

}
