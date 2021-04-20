import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import Address from './Addresses';
import Order from './Orders';

@Entity('users')
export default class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
