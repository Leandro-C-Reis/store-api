import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";
import User from "./User";

@Entity('addresses')
export default class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    zip_code: string;
    
    @Column()
    city: string;
    
    @Column()
    street: string;
    
    @Column()
    district: string;
    
    @Column()
    uf: string;
    
    @Column()
    number: number;
    
    @Column()
    complement: string;
    
    @Column()
    name: string;
    
    @Column()
    phone: string
    
    @Column()
    user_id: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => Order, order => order.address)
    Order: Order;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}