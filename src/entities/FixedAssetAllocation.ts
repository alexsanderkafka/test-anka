import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Allocation from "./Allocation";

@Entity("fixedassetallocation")
export default class FixedAssetAllocation {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    monthly_value: number;

    @Column({ type: "boolean", nullable: false })
    has_financing: boolean;

    @Column({ type: "int", nullable: true })
    installments: number;

    @Column({ type: "date", nullable: false })
    start_date: Date;

    @Column({ type: "date", nullable: false })
    end_date: Date;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    tax: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    down_payment: number;

    @ManyToOne(() => Allocation, (allocation) => allocation.getId)
    @JoinColumn({ name: "allocation_id" })
    allocation: Allocation;

  constructor(
    monthly_value: number,
    has_financing: boolean,
    start_date: Date,
    end_date: Date,
    tax: number,
    installments: number,
    down_payment: number,
    allocation: Allocation,
  ) {
    this.monthly_value = monthly_value;
    this.has_financing = has_financing;
    this.start_date = start_date;
    this.end_date = end_date;
    this.tax = tax;
    this.installments = installments;
    this.down_payment = down_payment;
    this.allocation = allocation;
  }
}