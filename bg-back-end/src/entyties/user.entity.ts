import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SandwichEntity } from './sandwich.entity';
import { OrderEntity } from './order.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn({
        name: 'user_id'
    })
    public id: number;

    @Column({
        name: 'user_mail'
    })
    public mail: string;

    @Column({
        name: 'user_firstname'
    })
    public firstname: string;

    @Column({
        name: 'user_lastname'
    })
    public lastname: string;

    @Column({
        name: 'user_total_loyalty'
    })
    public totalLoyalty: number;

    @Column({
        name: 'user_password',
        type: 'blob'
    })
    public password: string;


    // ---------------- RELATIONS ----------------
    @OneToMany(type => SandwichEntity, sandwich => sandwich.user)
    public sandwiches: SandwichEntity[];

    @OneToMany(type => OrderEntity, order => order.user)
    public orders: OrderEntity[];

}