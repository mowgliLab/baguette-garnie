
import { Sandwich } from './sandwich.model';

export class Menu {
    public id: number;
    public name: string;
    public sandwiches: Sandwich[];

    public static fromDbRow(dbRow: any, sandwiches: Sandwich[]): Menu {
        console.log(dbRow);
        return <Menu> {
            id: dbRow.menu_id,
            name: dbRow.menu_name,
            sandwiches: sandwiches
        }
    }
}
