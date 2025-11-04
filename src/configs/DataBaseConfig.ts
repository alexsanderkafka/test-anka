import 'dotenv/config';
import { DataSource } from "typeorm";
import Allocation from '../entities/Allocation';
import FinancialAllocation from '../entities/FinancialAllocation';
import FixedAssetAllocation from '../entities/FixedAssetAllocation';
import { HistorySimulation } from '../entities/HistorySimulation';
import Insurance from '../entities/Insurance';
import Movement from '../entities/Movement';
import MovementTransaction from '../entities/MovementTransaction';
import Person from '../entities/Person';

// Importar as entidades

export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "test",
    entities: [Allocation, FinancialAllocation, FixedAssetAllocation, HistorySimulation, Insurance, Movement, MovementTransaction, Person],
    //migrations: ["./src/migrations/*.ts"],
    logging: true,
    synchronize: false,
});
