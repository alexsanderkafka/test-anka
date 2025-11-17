import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import AuthController from './controllers/AuthController';
import AllocationController from './controllers/AllocationController';
import HistorySimulationController from './controllers/HistorySimulationController';
import InsuranceController from './controllers/InsuranceController';
import MovementController from './controllers/MovementController';

const app: any = createExpressServer({
    cors: true,
    routePrefix: '/api',
    //middlewares: [],
    controllers: [AuthController, AllocationController, HistorySimulationController, InsuranceController, MovementController],
    validation: true,
    defaultErrorHandler: true
});

export { app };