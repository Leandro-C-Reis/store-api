import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm";
import Address from './Addresses';
import User from './Users';

@Entity('orders')
export default class Orders {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    address_id: number;

    @OneToOne(() => Address, address => address.order)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @Column()
    user_id: number

    @OneToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @Column()
    total_value: number;
}
