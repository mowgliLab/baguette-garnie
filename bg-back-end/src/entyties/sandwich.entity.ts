import {
    Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { BreadEntity } from './bread.entity';
import { ToppingEntity } from './topping.entity';
import { UserEntity } from './user.entity';
import { OrderRowEntity } from './order-row.entity';
import { SandwichOnMenuEntity } from './sandwich-on-menu.entity';

@Entity('sandwich')
export class SandwichEntity {

    @PrimaryGeneratedColumn({
        name: 'sandwich_id',
        type: 'int'
    })
    public id: number;

    @Column({
        name: 'sandwich_name',
        type: 'varchar'
    })
    public name: string;

    @Column({
        name: 'sandwich_description',
        type: 'varchar'
    })
    public description: string;

    @Column({
        name: 'sandwich_is_custom',
        type: 'tinyint'
    })
    public isCustom: boolean;

    @Column({
        name: 'sandwich_image_src',
        type: 'varchar'
    })
    public imageSrc: string;


    // ---------------- RELATIONS ----------------
    @ManyToOne(type => BreadEntity, bread => bread.sandwiches)
    @JoinColumn({name: 'sandwich_bread_id'})
    public bread: BreadEntity;

    // @ManyToMany(type => MenuEntity, menu => menu.sandwiches)
    // public menus: MenuEntity[];

    @ManyToMany(type => ToppingEntity, topping => topping.sandwiches)
    @JoinTable({
        name: 'topping_on_sandwich',
        joinColumn: {
            name: 'tos_sandwich_id'
        },
        inverseJoinColumn: {
            name: 'tos_topping_id'
        }
    })
    public toppings: ToppingEntity[];

    @ManyToOne(type => UserEntity, user => user.sandwiches)
    @JoinColumn({name: 'sandwich_user_id'})
    public user: UserEntity;

    @OneToMany(type => OrderRowEntity, or => or.sandwich)
    public orderRows: OrderRowEntity[];

    @OneToMany(type => SandwichOnMenuEntity, som => som.menu)
    public sandwichOnMenus: SandwichOnMenuEntity[];

}