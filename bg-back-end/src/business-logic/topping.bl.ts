import { getRepository } from 'typeorm';
import { ToppingModel } from '../models/topping.model';
import { ToppingEntity } from '../entyties/topping.entity';

export class ToppingBl {

    public getToppings(): Promise<ToppingModel[]> {
        const toppingRepository = getRepository(ToppingEntity);
        return toppingRepository.find()
            .then(toppings => {
                const result = [];
                for (const topping of toppings) {
                    result.push(ToppingModel.fromEntity(topping));
                }
                return result;
            });
    }

}