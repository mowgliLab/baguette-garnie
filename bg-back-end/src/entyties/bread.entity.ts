import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SandwichEntity } from './sandwich.entity';

@Entity('bread')
export class BreadEntity {

    @PrimaryGeneratedColumn({
        name: 'bread_id',
        type: 'int'
    })
    public id: number;

    @Column({
        name: 'bread_name'
    })
    public name: string;

    @Column({
        name: 'bread_description'
    })
    public description: string;

    @Column({
        name: 'bread_price',
        type: 'double'
    })
    public price: number;

    @Column({
        name: 'bread_order_number',
        type: 'int'
    })
    public orderNumber: number;


    // ---------------- RELATIONS ----------------
    @OneToMany(type => SandwichEntity, sandwich => sandwich.bread)
    public sandwiches: SandwichEntity[];

}