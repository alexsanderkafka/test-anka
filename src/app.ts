import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import AuthController from './controllers/AuthController';
import AllocationController from './controllers/AllocationController';
import HistorySimulationController from './controllers/HistorySimulationController';
import InsuranceController from './controllers/InsuranceController';
import MovementController from './controllers/MovementController';
import ErrorHandler from './middleware/ErrorHandler';

const app: any = createExpressServer({
    cors: true,
    routePrefix: '/api',
    middlewares: [ErrorHandler],
    controllers: [AuthController, AllocationController, HistorySimulationController, InsuranceController, MovementController],
    classTransformer: true,
});

export { app };