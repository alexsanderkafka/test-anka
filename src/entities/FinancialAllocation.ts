import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Allocation from "./Allocation";

@Entity("financialallocation")
export default class FinancialAllocation {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({ type: "date", nullable: false, name: "allocation_date", transformer: {
        from: (value: string) => new Date(value),
        to: (value: Date) => value.toISOString().split('T')[0],
    }})
    allocationDate: Date;

    @OneToOne(() => Allocation, (allocation) => allocation.getId)
    @JoinColumn({ name: "allocation_id" })
    allocation?: Allocation;

    constructor(
        amount: number,
        allocationDate: Date,
        allocation: Allocation
    ){
        this.amount = amount;
        this.allocationDate = allocationDate;
        this.allocation = allocation;
    
    }
}