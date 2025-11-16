import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import { MySQLDataSource } from './configs/DataBaseConfig';
import Logger from './configs/LoggerConfig';
import AuthController from './controllers/AuthController';
import AllocationController from './controllers/AllocationController';
import HistorySimulationController from './controllers/HistorySimulationController';
import InsuranceController from './controllers/InsuranceController';

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    //middlewares: [],
    controllers: [AuthController, AllocationController, HistorySimulationController, InsuranceController]
});

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