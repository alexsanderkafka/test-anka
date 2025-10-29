import 'reflect-metadata';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import Teste from './controllers/Teste';

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [Teste]
});

app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
});