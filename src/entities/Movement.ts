import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity("movement")
export default class Movement {
    
    @PrimaryGeneratedColumn({ type: "bigint" })
    private id!: number;

    @Column({ type: "enum", enum: ["DESPESA", "RENDA"], nullable: false})
    type: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    description: string;

    @Column({ type: "enum", enum: ["UNICA", "MENSAL", "ANUAL"], nullable: false,})
    frequency: string;

    @Column({ type: "date", nullable: false })
    start_date: Date;

    @Column({ type: "date", nullable: true })
    end_date: Date;

    @ManyToOne(() => Person, (person) => person.getId)
    @JoinColumn({ name: "person_id" })
    person: Person;

    constructor(
        type: string,
        amount: number,
        frequency: string,
        start_date: Date,
        description: string,
        end_date: Date,
        person: Person
    ) {
        this.type = type;
        this.amount = amount;
        this.frequency = frequency;
        this.start_date = start_date;
        this.description = description;
        this.end_date = end_date;
        this.person = person;
    }

    getId(): number {
        return this.id;
    }
}