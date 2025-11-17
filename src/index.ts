import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { MySQLDataSource } from './configs/DataBaseConfig';
import Logger from './configs/LoggerConfig';
import { app } from './app';

app.use(express.json());

const initializeDatabase = async () => {
    try{
        await MySQLDataSource.initialize();
        Logger.info("Data Source has been initialized!");
    }catch(error){
        Logger.warn("Error during Data Source initialization: ", error);
        process.exit(1);
    }
}

initializeDatabase();

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    Logger.info(`Server is running on http://localhost:${PORT}/api`);
});