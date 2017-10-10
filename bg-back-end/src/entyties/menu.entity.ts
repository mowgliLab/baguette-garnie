import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SandwichOnMenuEntity } from './sandwich-on-menu.entity';

@Entity('menu')
export class MenuEntity {

    @PrimaryGeneratedColumn({
        name: 'menu_id',
        type: 'int'
    })
    public id: number;

    @Column({
        name: 'menu_name',
        type: 'varchar'
    })
    public name: string;

    @Column({
        name: 'menu_is_active',
        type: 'tinyint'
    })
    public isActive: boolean;


    // ---------------- RELATIONS ----------------
    // @ManyToMany(type => SandwichEntity, sandwich => sandwich.menus)
    // @JoinTable({
    //     name: 'sandwich_on_menu',
    //     joinColumn: {
    //         name: 'som_menu_id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'som_sandwich_id'
    //     }
    // })
    // public sandwiches: SandwichEntity[];

    @OneToMany(type => SandwichOnMenuEntity, som => som.menu)
    public sandwichOnMenus: SandwichOnMenuEntity[];

}