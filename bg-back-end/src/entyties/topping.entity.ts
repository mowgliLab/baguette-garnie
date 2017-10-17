import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SandwichEntity } from './sandwich.entity';

@Entity('topping')
export class ToppingEntity {

    @PrimaryGeneratedColumn({
        name: 'topping_id',
        type: 'int'
    })
    public id: number;

    @Column({
        name: 'topping_name',
        type: 'varchar'
    })
    public name: string;

    @Column({
        name: 'topping_price',
        type: 'double'
    })
    public price: number;

    @Column({
        name: 'topping_order_number',
        type: 'int'
    })
    public orderNumber: number;

    @Column({
        name: 'topping_type',
        type: 'int'
    })
    public type: number;


    // ---------------- RELATIONS ----------------
    @ManyToMany(type => SandwichEntity, sandwich => sandwich.toppings)
    public sandwiches: SandwichEntity[];
}
