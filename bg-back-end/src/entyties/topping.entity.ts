import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SandwichEntity } from './sandwich.entity';

@Entity('topping')
export class ToppingEntity {

    @PrimaryGeneratedColumn({
        name: 'topping_id'
    })
    public id: number;

    @Column({
        name: 'topping_name'
    })
    public name: string;

    @Column({
        name: 'topping_price'
    })
    public price: number;

    @Column({
        name: 'topping_order_number'
    })
    public orderNumber: number;


    // ---------------- RELATIONS ----------------
    @ManyToMany(type => SandwichEntity, sandwich => sandwich.toppings)
    public sandwiches: SandwichEntity[];
}