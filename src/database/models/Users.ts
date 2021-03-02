import {Entity, Column, PrimaryGeneratedColumn, Index} from "typeorm";

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
}
