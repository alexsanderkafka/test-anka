import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Allocation from "./Allocation";

@Entity("fixedassetallocation")
export default class FixedAssetAllocation {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    value: number;

    @Column({ type: "boolean", nullable: false, name: "has_financing" })
    hasFinancing: boolean;

    @Column({ type: "int", nullable: true })
    installments?: number | null | undefined;

    @Column({ type: "date", nullable: false, name: "start_date" })
    startDate: Date;

    @Column({ type: "date", nullable: true, name: "end_date" })
    private endDate?: Date | null | undefined;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    tax?: number | null | undefined;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, name: "down_payment" })
    downPayment?: number | null | undefined;

    @ManyToOne(() => Allocation, (allocation) => allocation.getId)
    @JoinColumn({ name: "allocation_id" })
    allocation: Allocation;

  constructor(
    value: number,
    hasFinancing: boolean,
    startDate: Date,
    allocation: Allocation,
    endDate?: Date | null | undefined,
    tax?: number | null | undefined,
    installments?: number | null | undefined,
    downPayment?: number | null | undefined,
  ) {
    this.value = value;
    this.hasFinancing = hasFinancing;
    this.startDate = startDate;
    this.endDate = endDate;
    this.tax = tax;
    this.installments = installments;
    this.downPayment = downPayment;
    this.allocation = allocation;
  }

  public setEndDate(endDate: Date): void {
    this.endDate = endDate;
  }
}