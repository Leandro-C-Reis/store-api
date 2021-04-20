import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
