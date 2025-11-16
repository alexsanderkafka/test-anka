import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity("insurance")
export default class Insurance {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "varchar", length: 36,  name: "external_id", unique: true })
    externalId!: string;

    @Column({ type: "varchar", length: 50, nullable: false})
    name: string;

    @Column({ type: "date", nullable: false, name: "start_date"})
    startDate: Date;

    @Column({ type: "int", nullable: false})
    duration: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, name: "monthly_value"})
    monthlyValue: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, name: "insured_value"})
    insuredValue: number;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "person_id" })
    person: Person;

    constructor(
        name: string,
        startDate: Date,
        duration: number,
        monthlyValue: number,
        insuredValue: number,
        person: Person
    ) {
        this.name = name;
        this.startDate = startDate;
        this.duration = duration;
        this.monthlyValue = monthlyValue;
        this.insuredValue = insuredValue;
        this.person = person;
    }

    @BeforeInsert()
    private generateUUID() {
        this.externalId = crypto.randomUUID();
    }
}