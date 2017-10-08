
import { SandwichModel } from './sandwich.model';

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
        }
    }
}
