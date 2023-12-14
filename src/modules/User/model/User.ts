import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryColumn({length: 10, type: 'varchar'})
    username!: string;

    @Column({unique: true, nullable: false, length: 30, type: 'varchar'})
    email!: string;

    @Column({unique: true, nullable: false, length: 15, type: 'varchar'})
    dni!: string;

    @Column({default: true, type: 'bit', nullable: false})
    status!: boolean;

    @Column({nullable: false, length: 15, type: 'varchar'})
    password!: string;
}