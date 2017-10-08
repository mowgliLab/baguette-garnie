import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { SandwichEntity } from './sandwich.entity';

@Entity('order_row')
export class OrderRowEntity {

    @PrimaryColumn({
        name: 'or_sandwich_id',
        type: 'int'
    })
    public sandwichId: number;

    @PrimaryColumn({
        name: 'or_order_id',
        type: 'int'
    })
    public orderId: number;

    @Column({
        name: 'or_unit_price',
        type: 'double'
    })
    public unitPrice: number;

    @Column({
        name: 'or_quantity',
        type: 'int'
    })
    public quantity: number;

    @Column({
        name: 'or_size',
        type: 'int'
    })
    public sandwichSize: number;


    // ---------------- RELATIONS ----------------
    @ManyToOne(type => OrderEntity, order => order.orderRows)
    @JoinColumn({
        name: 'or_order_id'
    })
    public order: OrderEntity;

    @ManyToOne(type => SandwichEntity, sandwich => sandwich.orderRows)
    @JoinColumn({
        name: 'or_sandwich_id'
    })
    public sandwich: SandwichEntity;
}