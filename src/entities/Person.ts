import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("person")
export default class Person {

    @PrimaryGeneratedColumn({ type: "bigint" })
    private id!: number;

    @Column({ type: "varchar", length: 150 })
    name: string;

    @Column({ type: "varchar", length: 100 })
    email: string;

    @Column({ type: "text"})
    password: string;

    @Column({ type: "enum", enum: ["VIVO", "MORTO"], default: "VIVO" })
    status: string;

    constructor(name: string,
        email: string, 
        password: string,
        status: string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status;
    }

    public getId(): number | undefined {
        return this.id;
    }
}