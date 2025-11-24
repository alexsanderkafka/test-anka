import request from "supertest";
import { app } from "../../src/app";
import { MySQLDataSource } from "../../src/configs/DataBaseConfig";

beforeAll(async () => {
    if(!MySQLDataSource.isInitialized){
        await MySQLDataSource.initialize();
    }
});

describe(("HistorySimulationController"), () => {

    const userId: string = "526acda8-99e4-421c-8754-658523725c48"
    const historyId: string = "1b47c610-226c-4b1d-ba35-020ac35c2f8c"

    //Criando um novo registro
    it("New history simulation", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            tax: 15.0,
            startDate: "2025-11-08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("tax");
        expect(response.body).toHaveProperty("person");
    });

    //Criando um novo registro com usuário inválido
    it("Invalid user id", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            tax: 15.0,
            startDate: "2025-11-08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/invalid-user-id`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Campo name vazio
    it("Empty name", async () => {
        const historySimulation: any = {
            name: "",
            tax: 15.0,
            startDate: "2025-11-08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name is required");
    });

    //Campo name com formato inválido
    it("Name field with invalid format", async () => {
        const historySimulation: any = {
            name: 55656,
            tax: 15.0,
            startDate: "2025-11-08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name must be a string");
    });

    //Campo tax vazio
    it("Empty tax", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            startDate: "2025-11-08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("tax is required, tax must be a number");
    });

    //Campo tax com formato inválido
    it("Tax field with invalid format", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            tax: "15.0",
            startDate: "2025-11-08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("tax must be a number");
    });

    //Campo startDate vazio
    it("Empty startDate", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            tax: 15.0
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate is required, startDate must be in YYYY-MM-DD format, startDate must be a string");
    });

    //Campo startDate com formato inválido
    it("startDate field with invalid format", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            tax: 15.0,
            startDate: "2025/11/08"
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate must be in YYYY-MM-DD format");
    });

    //Todos os campos vazios
    it("All fields empty", async () => {
        const historySimulation: any = {
            name: "",
            tax: "",
            startDate: ""
        }
        
        const response = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name is required, tax is required, tax must be a number, startDate is required, startDate must be in YYYY-MM-DD format");
    });

    //Testando os endpoints de GET

    //Buscando todos os registros de history simulation de um usuário
    it("Find all history simulation", async () => {
        const response = await request(app)
            .get(`/api/history-simulation/all/${userId}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    //Buscando todos os registros de history simulation de um usuário invalido
    it("Find all history simulation with invalid user id", async () => {
        const response = await request(app)
            .get(`/api/history-simulation/all/invalid-user-id`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Buscando um registro com seu externalId
    it("Find one history simulation", async () => {
        const response = await request(app)
            .get(`/api/history-simulation/${historyId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("tax");
        expect(response.body.externalId).toBe(historyId);
    });

    //Buscando um registro com externalId inválido
    it("Find one history simulation with invalid externalId", async () => {
        const response = await request(app)
            .get(`/api/history-simulation/invalid-history-id`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("History simulation not found");
    });

    //Testando o endpoint de DELETE

    //Deletando um registro com seu externalId
    it("Delete one history simulation", async () => {
        const historySimulation: any = {
            name: "Teste para aposentar",
            tax: 15.0,
            startDate: "2025-11-08"
        }
        
        const historySaved = await request(app)
            .post(`/api/history-simulation/${userId}`)
            .send(historySimulation);

        expect(historySaved.statusCode).toBe(201);

        const response = await request(app)
            .delete(`/api/history-simulation/${historySaved.body.externalId}`);

        expect(response.statusCode).toBe(204);
    });
});


afterAll(async () => {
  if(MySQLDataSource.isInitialized) {
    await MySQLDataSource.destroy();
  }
});