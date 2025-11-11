import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Person from "./Person";
import FinancialAllocation from "./FinancialAllocation";
import FixedAssetAllocation from "./FixedAssetAllocation";

@Entity("allocation")
export default class Allocation{

    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "varchar", length: 36,  name: "external_id", unique: true })
    externalId!: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "enum", enum: ["FINANCEIRA", "IMOBILIZADA"],  nullable: false})
    type: string;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "person_id" })
    person: Person;

    @OneToOne(() => FinancialAllocation, (fa) => fa.allocation)
    financialAllocation?: FinancialAllocation;

    @OneToOne(() => FixedAssetAllocation, (fxa) => fxa.allocation)
    fixedAssetAllocation?: FixedAssetAllocation;

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

    @BeforeInsert()
    private generateUUID() {
        this.externalId = crypto.randomUUID();
    }


}