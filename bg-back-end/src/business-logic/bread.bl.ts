import { getRepository } from 'typeorm';
import { BreadModel } from '../models/bread.model';
import { BreadEntity } from '../entyties/bread.entity';

export class BreadBl {

    public getBreads(): Promise<BreadModel[]> {
        const breadRepository = getRepository(BreadEntity);
        return breadRepository.find()
            .then(breads => {
                const result = [];
                for (const bread of breads) {
                    result.push(BreadModel.fromEntity(bread));
                }
                return result;
            });
    }

}