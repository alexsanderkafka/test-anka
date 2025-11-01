import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Allocation from "./Allocation";

@Entity("financialallocation")
export default class FinancialAllocation {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({ type: "date", nullable: false })
    allocation_date: Date;

    @ManyToOne(() => Allocation, (allocation) => allocation.getId)
    @JoinColumn({ name: "allocation_id" })
    allocation?: Allocation;

    constructor(
        amount: number,
        allocation_date: Date,
        allocation: Allocation
    ){
        this.amount = amount;
        this.allocation_date = allocation_date;
        this.allocation = allocation;
    
    }
}