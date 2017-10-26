import { getRepository } from 'typeorm';
import { ToppingModel } from '../models/topping.model';
import { ToppingEntity } from '../entyties/topping.entity';

export class ToppingBl {

    public getToppings(): Promise<ToppingModel[]> {
        const toppingRepository = getRepository(ToppingEntity);
        return toppingRepository.createQueryBuilder('topping')
            .orderBy('topping.orderNumber, topping.name, topping.type')
            .getMany()
            .then(toppings => {
                const result = [];
                for (const topping of toppings) {
                    result.push(ToppingModel.fromEntity(topping));
                }
                return result;
            });
    }

}
