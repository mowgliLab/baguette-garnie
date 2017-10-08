import { SandwichEntity } from './sandwich.entity';
import { MenuEntity } from './menu.entity';
import { Column, JoinColumn, ManyToOne, PrimaryColumn, Entity } from 'typeorm';

@Entity('sandwich_on_menu')
export class SandwichOnMenuEntity {

    @PrimaryColumn({
        name: 'som_sandwich_id',
        type: 'int'
    })
    public sandwichId: number;

    @PrimaryColumn({
        name: 'som_menu_id',
        type: 'int'
    })
    public menuId: number;

    @Column({
        name: 'som_order_number'
    })
    public orderNumber: number;


    // ---------------- RELATIONS ----------------
    @ManyToOne(type => SandwichEntity, sandwich => sandwich.sandwichOnMenus)
    @JoinColumn({
        name: 'som_sandwich_id'
    })
    public sandwich: SandwichEntity;

    @ManyToOne(type => MenuEntity, menu => menu.sandwichOnMenus)
    @JoinColumn({
        name: 'som_menu_id'
    })
    public menu: MenuEntity;
}