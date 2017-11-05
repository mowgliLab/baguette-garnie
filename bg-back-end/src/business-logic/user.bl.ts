import { UserModel } from '../models/user.model';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entyties/user.entity';
import * as bcrypt from 'bcrypt';
import { OrderModel } from '../models/order.model';
import { OrderEntity } from '../entyties/order.entity';

export class UserBl {

    /**
     * Create a user for registration.
     * This method only manage database insert and don't manage password encryption.
     *
     * @param {UserModel} user : the user to add to db.
     * @return {Promise<number>} id of the new added user, -1 if error on insert.
     */
    public addUser(user: UserModel): Promise<number> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .save(UserModel.toEntity(user))
            .then(res => res.id);
    }

    public updateUser(user: UserModel): Promise<boolean> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .updateById(user.id, UserModel.toEntity(user))
            .then(res => true);
    }

    public checkAuthentication(mail: string, password: string): Promise<UserModel> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .findOne({mail: mail})
            .then(user => {
                if (bcrypt.compareSync(password, user.password)) {
                    return UserModel.fromEntity(user);
                } else {
                    return null;
                }
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

    // TODO remove after tests
    // ----------UTILS----------
    public getUser(userId: number): Promise<UserModel | void> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .findOneById(userId)
            .then(user => UserModel.fromEntity(user));
    }

    public getUsers(): Promise<UserModel[]> {
        const userRepository = getRepository(UserEntity);


        // return userRepository
        //     .createQueryBuilder('user')
        //     .where('user.id IN (:idList)', {idList: [1,2,3]})
        //     .getMany()
        //     .then(users => {
        //         const result = [];
        //         for (const u of users) {
        //             result.push(UserModel.fromEntity(u));
        //         }
        //         return result;
        //     });

        return userRepository
            .find()
            .then(users => {
                const result = [];
                for (const u of users) {
                    result.push(UserModel.fromEntity(u));
                }
                return result;
            });
    }
}
