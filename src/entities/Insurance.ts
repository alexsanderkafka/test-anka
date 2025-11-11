import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity("insurance")
export default class Insurance {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "varchar", length: 50, nullable: false})
    name: string;

    @Column({ type: "date", nullable: false})
    start_date: Date;

    @Column({ type: "int", nullable: false})
    duration: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false})
    monthly_value: number;

    @Column({ type: "decimal", precision: 100, scale: 2, nullable: false})
    insured_value: number;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "person_id" })
    person: Person;

    constructor(
        name: string,
        start_date: Date,
        duration: number,
        monthly_value: number,
        insured_value: number,
        person: Person
    ) {
        this.name = name;
        this.start_date = start_date;
        this.duration = duration;
        this.monthly_value = monthly_value;
        this.insured_value = insured_value;
        this.person = person;
    }
}