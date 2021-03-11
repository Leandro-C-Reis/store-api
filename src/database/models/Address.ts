import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn, OneToOne} from "typeorm";
import User from './Users';
import Order from './Orders';

@Entity('addresses')
export default class Address {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @PrimaryColumn()
    user_id: number;

    @ManyToOne(() => User, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => Order, order => order.address)
    order: Order;
    
    @Column()
    cep: string;
    
    @Column()
    city: string;
    
    @Column()
    street: string;

    @Column()
    district: string;

    @Column()
    uf: string
}
