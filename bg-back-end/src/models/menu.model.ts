
import { SandwichModel } from './sandwich.model';
import { MenuEntity } from '../entyties/menu.entity';
import * as _ from 'lodash';

export class MenuModel {
    public id: number;
    public name: string;
    public sandwiches: SandwichModel[];

    public static fromDbRow(dbRow: any, sandwiches: SandwichModel[]): MenuModel {
        console.log(dbRow);
        return <MenuModel> {
            id: dbRow.menu_id,
            name: dbRow.menu_name,
            sandwiches: sandwiches
        };
    }

    public static fromEntity (entity: MenuEntity): MenuModel {
        const result = new MenuModel();

        result.id = entity.id;
        result.name = entity.name;

        if (entity.sandwichOnMenus && entity.sandwichOnMenus.length > 0) {
            result.sandwiches = [];
            for (const som of entity.sandwichOnMenus) {
                result.sandwiches.push(_.omit(SandwichModel.fromEntity(som), ['bread', 'toppings']));
            }
        }

        return result;
    }
}
