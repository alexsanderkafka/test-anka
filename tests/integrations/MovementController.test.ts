import request from "supertest";
import { app } from "../../src/app";
import { MySQLDataSource } from "../../src/configs/DataBaseConfig";

let movementCreated: any;
const userId: string = "526acda8-99e4-421c-8754-658523725c48"

beforeAll(async () => {
    if(!MySQLDataSource.isInitialized){
        await MySQLDataSource.initialize();
    }

    const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send({
                type: "RENDA",
                amount: 200.70,
                description: "Aluguel mensal",
                frequency: "MENSAL",
                startDate: "2025-11-11",
                endDate: "2030-11-11"
            });

    movementCreated = response.body;
});

describe(("MovementController"), () => {

    //Criando uma nova movimentação
    it("New movement", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("amount");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("frequency");
        expect(response.body).toHaveProperty("startDate");
        expect(response.body).toHaveProperty("endDate");
    });

    //Criando uma nova movimentação com usuário inválido
    it("New movement with invalid user id", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/invalid-user-id`)
            .send(movement);
                    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Campo type vazio
    it("Empty type", async () => {
        const movement: any = {
            type: "",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("type should not be empty");
    });

    //Campo type com formato inválido
    it("Invalid type", async () => {
        const movement: any = {
            type: 23142,
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/invalid-user-id`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("type must be a string");
    });

    //Campo amount vazio
    it("Empty amount", async () => {
        const movement: any = {
            type: "RENDA",
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("amount should not be empty, amount must be a number");
    });

    //Campo amount com formato inválido
    it("Invalid amount", async () => {
        const movement: any = {
            type: "RENDA",
            amount: "200.70",
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("amount must be a number");
    });

    //Campo description vazio
    it("Empty description", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("description should not be empty");
    });

    //Campo description com formato inválido
    it("Invalid description", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: 34345,
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("description must be a string");
    });

    //Campo frequency vazio
    it("Empty frequency", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("frequency should not be empty");
    });

    //Campo frequency com formato inválido
    it("Invalid frequency", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: 32443,
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("frequency must be a string");
    });

    //Campo startDate vazio
    it("Empty startDate", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate should not be empty, startDate must be in YYYY-MM-DD format, startDate must be a string");
    });

    //Campo startDate com formato inválido
    it("Invalid startDate", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025/11/11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate must be in YYYY-MM-DD format");
    });

    //Campo endDate vazio
    it("Empty endDate", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("endDate should not be empty, endDate must be in YYYY-MM-DD format, endDate must be a string");
    });

    //Campo endDate comn formato inválido
    it("Invalid endDate", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030/11/11"
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("endDate must be in YYYY-MM-DD format");
    });

    //Todos os campos vazios
    it("All fields empty", async () => {
        const movement: any = {
            type: "",
            amount: "",
            description: "",
            frequency: "",
            startDate: "",
            endDate: ""
        }
                    
        const response = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("type should not be empty, amount should not be empty, amount must be a number, description should not be empty, frequency should not be empty, startDate should not be empty, startDate must be in YYYY-MM-DD format, endDate should not be empty, endDate must be in YYYY-MM-DD format");
    });

    //Testando os endpoints de GET

    //Buscando uma movimentação com externalId
    it("Find movement with externalId", async () => {
        const response = await request(app)
            .get(`/api/movement/${movementCreated.externalId}`)
                    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("amount");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("frequency");
        expect(response.body).toHaveProperty("startDate");
        expect(response.body).toHaveProperty("endDate");
    });

    //Buscando uma movimentação com externalId inválido
    it("Find movement with invalid externalId", async () => {
        const response = await request(app)
            .get(`/api/movement/invalid-external-id`)
                    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Movement not found");
    });

    //Testanndo o endpoint de PUT

    //Atualizando uma movimentação
    it("Update movement", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .put(`/api/movement/${movementCreated.externalId}`)
            .send(movement);
                    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("amount");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("frequency");
        expect(response.body).toHaveProperty("startDate");
        expect(response.body).toHaveProperty("endDate");
    });
    
    //Atualizando uma movimentação com externalId inválido
    it("Update movement", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }
                    
        const response = await request(app)
            .put(`/api/movement/invalid-external-id`)
            .send(movement);
                    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Movement not found");
    });

    //Testando o endpoint de DELETE

    //Deletando uma movimentação com externalId
    it("Delete movement", async () => {
        const movement: any = {
            type: "RENDA",
            amount: 200.70,
            description: "Aluguel mensal",
            frequency: "MENSAL",
            startDate: "2025-11-11",
            endDate: "2030-11-11"
        }

        const saved = await request(app)
            .post(`/api/movement/${userId}`)
            .send(movement);

        expect(saved.statusCode).toBe(201);
                    
        const response = await request(app)
            .delete(`/api/movement/${saved.body.externalId}`);
                    
        expect(response.statusCode).toBe(204);
    });

    //Deletando uma movimentação com externalId inválido
    it("Delete movement with invalid externalId", async () => {            
        const response = await request(app)
            .delete(`/api/movement/invalid-external-id`);
                    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("This movement not found");
    });
});

afterAll(async () => {
    await request(app).delete(`/api/movement/${movementCreated.externalId}`);

    if(MySQLDataSource.isInitialized) {
        await MySQLDataSource.destroy();
    }
});