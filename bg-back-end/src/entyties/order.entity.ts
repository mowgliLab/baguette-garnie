import { UserEntity } from './user.entity';
import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { OrderRowEntity } from './order-row.entity';

@Entity('purchase_order')
export class OrderEntity {

    public static readonly statusEnum = ['open', 'payed', 'closed'];

    @PrimaryGeneratedColumn({
        name: 'order_id',
        type: 'int'
    })
    public id: number;

    @Column({
        name: 'order_date',
        type: 'date'
    })
    public date: Date;

    @Column({
        name: 'order_status',
        type: 'enum',
        enum: OrderEntity.statusEnum
    })
    public status: string;

    // ---------------- RELATIONS ----------------
    @ManyToOne(type => UserEntity, user => user.orders)
    @JoinColumn({name: 'order_user_id'})
    public user: UserEntity;

    @OneToMany(type => OrderRowEntity, or => or.order)
    public orderRows: OrderRowEntity[];
}