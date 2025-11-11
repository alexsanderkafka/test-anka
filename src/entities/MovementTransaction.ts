import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Movement from "./Movement";

@Entity("movementtransaction")
export default class MovementTransaction {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "date", nullable: false })
    transaction_date: Date;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    amount: number;

    @ManyToOne(() => Movement, {onDelete: "CASCADE", nullable: false,})
    @JoinColumn({ name: "movement_id" })
    movement: Movement;

    constructor(
        transaction_date: Date,
        amount: number,
        movement: Movement
    ) {
        this.transaction_date = transaction_date;
        this.amount = amount;
        this.movement = movement;
    }
}