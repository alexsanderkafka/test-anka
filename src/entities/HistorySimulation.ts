
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity("historysimulation")
export class HistorySimulation {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "varchar", length: 36,  name: "external_id", unique: true })
    externalId!: string;

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

    @BeforeInsert()
    private generateUUID() {
        this.externalId = crypto.randomUUID();
    }
}