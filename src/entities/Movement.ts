import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";

@Entity("movement")
export default class Movement {
    
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "enum", enum: ["DESPESA", "RENDA"], nullable: false})
    type: string;

    @Column({ type: "varchar", length: 36,  name: "external_id", unique: true })
    externalId!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    description: string;

    @Column({ type: "enum", enum: ["UNICA", "MENSAL", "ANUAL"], nullable: false,})
    frequency: string;

    @Column({ type: "date", nullable: false, name: "start_date" })
    startDate: Date;

    @Column({ type: "date", nullable: true, name: "end_date" })
    endDate: Date;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "person_id" })
    person: Person;

    constructor(
        type: string,
        amount: number,
        frequency: string,
        startDate: Date,
        description: string,
        endDate: Date,
        person: Person
    ) {
        this.type = type;
        this.amount = amount;
        this.frequency = frequency;
        this.startDate = startDate;
        this.description = description;
        this.endDate = endDate;
        this.person = person;
    }

    getId(): number {
        return this.id;
    }

    @BeforeInsert()
    private generateUUID() {
        this.externalId = crypto.randomUUID();
    }
}