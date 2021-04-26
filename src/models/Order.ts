import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./Address";
import User from "./User";

@Entity('orders')
export default class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total_value: number;
    
    @Column()
    is_active: boolean;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;
    
    @JoinColumn({ name: 'address_id' })
    @ManyToOne(() => Address)
    address: Address;

    @Column()
    user_id: number;
    
    @Column()
    address_id: number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}