import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./Address";
import Order from "./Order";

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column({ select: false })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Address, address => address.user)
    addresses: Address;

    @OneToMany(() => Order, order => order.user)
    orders: Order;
}