import 'dotenv/config';
import { DataSource } from "typeorm";

// Importar as entidades

export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "test",
    //entities: [Images, Plan, Person, Message, Payment],
    logging: true
});
