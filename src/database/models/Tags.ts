import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import Products from "./Products";

@Entity('tags')
export default class Tags {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    tag: string;

    @Column()
    product_id: number;

    @OneToOne(() => Products, product => product.tags)
    @JoinColumn({ name: 'product_id' })
    product: Products;
}
