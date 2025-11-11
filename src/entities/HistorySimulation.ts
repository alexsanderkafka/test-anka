
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity()
export class HistorySimulation {

    @PrimaryGeneratedColumn({ type: "bigint" })
    private id!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, default: 4.00 })
    tax: number;

    @Column({ type: "date", nullable: false })
    start_date: Date;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "person_id" })
    person: Person;

    constructor(
            name: string,
            tax: number,
            start_date: Date,
            person: Person
        ) {
            this.name = name;
            this.tax = tax;
            this.start_date = start_date;
            this.person = person;
    }

    getId(): number | undefined {
        return this.id;
    }
}