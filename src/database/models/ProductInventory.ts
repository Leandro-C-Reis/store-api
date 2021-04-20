import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, } from "typeorm";
import Product from './Products';

@Entity('product_inventory')
export default class ProductInventory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Product, product => product.inventory)
    @JoinColumn({ name: 'product' })
    product: Product;

    @Column()
    amount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
