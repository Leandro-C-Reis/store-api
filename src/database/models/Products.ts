import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne} from "typeorm";
import ProductInventory from "./ProductInventory";

@Entity('products')
export default class Products {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    description: string;

    @OneToOne(() => ProductInventory, inventory => inventory.product)
    inventory: ProductInventory;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
