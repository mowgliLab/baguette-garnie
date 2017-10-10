import { ConnectionManagerBl } from './connection-manager.bl';
import { SandwichModel } from '../models/sandwich.model';
import { SandwichEntity } from '../entyties/sandwich.entity';

export class SandwichBl {

    public getSandwich(sandwichId: number): Promise<SandwichModel> {
        const connection = ConnectionManagerBl.getConnection();
        return connection.connect().then(async conn => {
            const sandwichRepository = conn.getRepository(SandwichEntity);
            const sandwich = new SandwichEntity();
            /*const menu = await menuRepository.createQueryBuilder('menu')
                .leftJoinAndSelect('menu.sandwichOnMenus', 'sandwichOnMenu')
                .leftJoinAndSelect('sandwichOnMenu.sandwich', 'sandwich')
                .leftJoinAndSelect('sandwich.toppings', 'topping')
                .leftJoinAndSelect('sandwich.bread', 'bread')
                .where('menu.isActive = true').getOne();*/
            connection.close();
            return SandwichModel.fromEntity(sandwich);
        });
    }

    public getSandwiches(): SandwichModel {
        return new SandwichModel();
    }

}