import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity("allocation")
export default class Allocation{

    @PrimaryGeneratedColumn({ type: "bigint" })
    private id!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "enum", enum: ["FINANCEIRA", "IMOBILIZADA"],  nullable: false})
    type: string;

    @ManyToOne(() => Person, (person) => person.getId)
    @JoinColumn({ name: "person_id" })
    person: Person;

    constructor(
        name: string,
        type: string,
        person: Person
    ) {
        this.name = name;
        this.type = type;
        this.person = person;
    }

    getId(): number {
        return this.id;
    }


}