import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Orders from "./Orders";
import Products from "./Products";

@Entity('products_order')
export default class ProductsOrder {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    amount: number;

    @Column({ select: false })
    product_id: number;

    @Column({ select: false })
    order_id: number;

    @ManyToOne(() => Products, products => products.orders)
    @JoinColumn({ name: 'product_id' })
    product: Products;

    @ManyToOne(() => Orders, orders => orders.products)
    @JoinColumn({ name: 'order_id' })
    order: Orders;
}