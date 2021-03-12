import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm";
import Address from './Addresses';

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
    total_value: number;

    @Column()
    amount: number;
}
