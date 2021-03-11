import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn, OneToOne} from "typeorm";
import Address from './Address';

@Entity('orders')
export default class Orders {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @PrimaryColumn()
    address_id: number;

    @OneToOne(() => Address, address => address.order)
    @JoinColumn({ name: 'address_id' })
    address: Address;
    
    @Column()
    total_value: number;

    @Column()
    amount: number;
}
