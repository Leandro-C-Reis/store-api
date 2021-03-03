import {Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('users')
export default class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
