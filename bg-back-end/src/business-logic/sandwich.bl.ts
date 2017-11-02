import { SandwichModel } from '../models/sandwich.model';
import { SandwichEntity } from '../entyties/sandwich.entity';
import { getRepository } from 'typeorm';
import { UserModel } from '../models/user.model';

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

    public saveCustomSandwich(sandwich: SandwichModel, user: UserModel): Promise<any> {
        const sandwichRepository = getRepository(SandwichEntity);
        const sandwichEntity = SandwichModel.toEntity(sandwich, true);
        sandwichEntity.user = UserModel.toEntity(user);
        return sandwichRepository
            .save(sandwichEntity)
            .then(res => res)
            .catch(err => false);

    }

}
