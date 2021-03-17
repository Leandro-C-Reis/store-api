import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany} from "typeorm";
import ProductInventory from "./ProductInventory";
import ProductsOrders from "./ProductsOrders";

@Entity('products')
export default class Products {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    value: number;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @OneToOne(() => ProductInventory, inventory => inventory.product)
    inventory: ProductInventory;

    @OneToMany(() => ProductsOrders, productsOrders => productsOrders.product)
    orders: ProductsOrders[];
}
