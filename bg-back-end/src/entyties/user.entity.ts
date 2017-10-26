import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, AfterLoad } from 'typeorm';
import { SandwichEntity } from './sandwich.entity';
import { OrderEntity } from './order.entity';

import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn({
        name: 'user_id',
        type: 'int'
    })
    public id: number;

    @Column({
        name: 'user_role',
        type: 'enum',
        enum: ['user', 'admin']
    })
    public role: string;

    @Column({
        name: 'user_mail',
        type: 'varchar'
    })
    public mail: string;

    @Column({
        name: 'user_firstname',
        type: 'varchar'
    })
    public firstname: string;

    @Column({
        name: 'user_lastname',
        type: 'varchar'
    })
    public lastname: string;

    @Column({
        name: 'user_total_loyalty',
        type: 'int'
    })
    public totalLoyalty: number;

    @Column({
        name: 'user_password',
        type: 'blob'
    })
    public passwordBfr: Buffer;

    public password: string;


    // ---------------- RELATIONS ----------------
    @OneToMany(type => SandwichEntity, sandwich => sandwich.user)
    public sandwiches: SandwichEntity[];

    @OneToMany(type => OrderEntity, order => order.user)
    public orders: OrderEntity[];


    // ---------------- LISTENERS ----------------
    @BeforeInsert()
    cryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
        this.passwordBfr = new Buffer(this.password);
    }

    @AfterLoad()
    fillPasswordString() {
        this.password = this.passwordBfr.toString();
    }
}
