import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany} from "typeorm";
import Address from './Addresses';
import ProductsOrders from "./ProductsOrders";
import User from './Users';

@Entity('orders')
export default class Orders {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    address_id: number;
    
    @Column()
    user_id: number

    @OneToOne(() => Address, address => address.order)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @OneToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => ProductsOrders, productsOrders => productsOrders.order)
    products: ProductsOrders[];
    
    @Column()
    total_value: number;

    @Column()
    is_active: boolean;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;
}
