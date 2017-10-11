import { SandwichModel } from '../models/sandwich.model';
import { SandwichEntity } from '../entyties/sandwich.entity';
import { getRepository } from 'typeorm';

export class SandwichBl {

    public getSandwich(sandwichId: number): Promise<SandwichModel> {
        const sandwichRepository = getRepository(SandwichEntity);
        return sandwichRepository.createQueryBuilder('sandwich')
            .leftJoinAndSelect('sandwich.toppings', 'topping')
            .leftJoinAndSelect('sandwich.bread', 'bread')
            .where(`sandwich.id = ${sandwichId}`).getOne()
            .then(sandwich => {
                return SandwichModel.fromEntity(sandwich);
            });
    }

    public getSandwiches(): SandwichModel {
        return new SandwichModel();
    }

}