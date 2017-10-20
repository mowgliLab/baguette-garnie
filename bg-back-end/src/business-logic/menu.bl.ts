import { MenuModel } from '../models/menu.model';
import { MenuEntity } from '../entyties/menu.entity';
import { getRepository } from 'typeorm';

export class MenuBl {

    public getActiveMenu (): Promise<MenuModel> {
        const menuRepository = getRepository(MenuEntity);
        return menuRepository.createQueryBuilder('menu')
            .leftJoinAndSelect('menu.sandwichOnMenus', 'sandwichOnMenu')
            .leftJoinAndSelect('sandwichOnMenu.sandwich', 'sandwich')
            .leftJoinAndSelect('sandwich.toppings', 'topping')
            .leftJoinAndSelect('sandwich.bread', 'bread')
            .where('menu.isActive = true').orderBy('sandwichOnMenu.orderNumber, sandwich.name').getOne().then(menu => {
                return MenuModel.fromEntity(menu);
        });
    }

}
