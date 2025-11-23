import request from "supertest";
import { app } from "../../src/app";
import { MySQLDataSource } from "../../src/configs/DataBaseConfig";

beforeAll(async () => {
    if(!MySQLDataSource.isInitialized){
        await MySQLDataSource.initialize();
    }
});

describe(("AllocationController"), () => {

    const userId: string = "526acda8-99e4-421c-8754-658523725c48"
    const allocationId: string = "41963210-a230-46da-b957-f936382383ee"

    //Usuário que não existe no banco de dados
    it("Empty name field", async () => {
        const allocation = {
            name: "Extra do mês",
            amount: 1000,
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post("/api/allocation/financial/teste-user-id")
            .send(allocation);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Criando uma nova financial allocation com um usuário que existe
    it("New financial allocation", async () => {
        const allocation = {
            name: "Extra do mês",
            amount: 1000,
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Financial allocation created successfully");
    });

    //Name em branco
    it("Empty name field", async () => {
        const allocation = {
            name: "",
            amount: 1000,
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required");
    });

    //Amount em branco
    it("Empty amount field", async () => {
        const allocation = {
            name: "Dinheiro Extra",
            amount: "",
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("amount must be a number, amount is required");
    });

    //allocationDate em branco
    it("Empty allocationDate field", async () => {
        const allocation = {
            name: "Dinheiro Extra",
            amount: 1500,
            allocationDate: ""
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("allocationDate must be in YYYY-MM-DD format");
    });

    //Todos os campos em branco
    it("Empty fields", async () => {
        const allocation = {
            name: "",
            amount: "",
            allocationDate: ""
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required, amount must be a number, amount is required, allocationDate must be in YYYY-MM-DD format");
    });

    //Campo name com formato inválido
    it("Name with invalid format", async () => {
        const allocation = {
            name: true,
            amount: 1500,
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string");
    });

    //Campo amount com formato inválido
    it("Amount with invalid format", async () => {
        const allocation = {
            name: "Dinheiro Extra",
            amount: "teste",
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("amount must be a number");
    });

    //Campo allocationDate com formato inválido
    it("allocationDate with invalid format", async () => {
        const allocation = {
            name: "Dinheiro Extra",
            amount: 1500,
            allocationDate: "teste"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("allocationDate must be in YYYY-MM-DD format");
    });

    //Todos os campos com formato inválido
    it("All fields with invalid format", async () => {
        const allocation = {
            name: 123,
            amount: "1500",
            allocationDate: "teste"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string, amount must be a number, allocationDate must be in YYYY-MM-DD format");
    });

     //Name e amount em branco
    it("Empty name and amount", async () => {
        const allocation = {
            name: "",
            amount: "",
            allocationDate: "2025-11-08"
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required, amount must be a number, amount is required");
    });

    //Name e allocationDate em branco
    it("Empty name and allocationDate", async () => {
        const allocation = {
            name: "",
            amount: 1500,
            allocationDate: ""
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required, allocationDate must be in YYYY-MM-DD format");
    });

    //amount e allocationDate em branco
    it("Empty name and allocationDate", async () => {
        const allocation = {
            name: "Extra do mês",
            amount: "",
            allocationDate: ""
        }
    
        const response = await request(app)
            .post(`/api/allocation/financial/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("amount must be a number, amount is required, allocationDate must be in YYYY-MM-DD format");
    });

    //Teste na fixed-asset

    //Usuário que não existe no banco de dados
    it("Not found user", async () => {
        const allocation = {
            name: "Carro Novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/teste-user-id`)
            .send(allocation);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Criando uma nova fixed asset allocation com um usuário que existe
    it("New fixed allocation", async () => {
        const allocation = {
            name: "Carro Novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Fixed allocation created successfully");
    });

    //Name em branco
    it("Empty name", async () => {
        const allocation = {
            name: "",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required");
    });

    //value em branco
    it("Empty value", async () => {
        const allocation = {
            name: "Carro Novo",
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("value is required, value must be a number");
    });

    //hasFinancing em branco
    it("Empty hasFinancing", async () => {
        const allocation = {
            name: "Carro Novo",
            value: 1000,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("hasFinancing is required, hasFinancing must be a boolean");
    });

    //installments em branco
    it("Empty installments", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("installments is required, installments must be a number");
    });

    //startDate em branco
    it("Empty startDate", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            tax: 25.5,
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate is required, startDate must be in YYYY-MM-DD format, startDate must be a string");
    });

    //tax em branco
    it("Empty tax", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            downPayment: 150000
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("tax is required, tax must be a number");
    });

    //downPayment em branco
    it("Empty downPayment", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("downPayment is required, downPayment must be a number");
    });

    //todos os campos em branco
    it("Empty fixed fields", async () => {
        const allocation = {
            name: "",
            value: "",
            hasFinancing: "",
            installments: "",
            startDate: "",
            tax: "",
            downPayment: "" 
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required, value is required, value must be a number, hasFinancing is required, hasFinancing must be a boolean, installments is required, installments must be a number, startDate is required, startDate must be in YYYY-MM-DD format, tax is required, tax must be a number, downPayment is required, downPayment must be a number");
    });

    //name com formato inválido
    it("Invalid name format", async () => {
        const allocation = {
            name: 123,
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 1500
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string");
    });

    //value com formato inválido
    it("Invalid value format", async () => {
        const allocation = {
            name: "Carro novo",
            value: "teste",
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 1500
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("value must be a number");
    });

     //hasFinancing com formato inválido
    it("Invalid hasFinancing format", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: "true",
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 1500
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("hasFinancing must be a boolean");
    });

    //installments com formato inválido
    it("Invalid installments format", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: "48",
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: 1500
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("installments must be a number");
    });

    //startDate com formato inválido
    it("Invalid startDate format", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025/11/08",
            tax: 25.5,
            downPayment: 1500
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate must be in YYYY-MM-DD format");
    });

    //tax com formato inválido
    it("Invalid tax format", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: "25.5",
            downPayment: 1500
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("tax must be a number");
    });

    //downPayment com formato inválido
    it("Invalid downPayment format", async () => {
        const allocation = {
            name: "Carro novo",
            value: 1000,
            hasFinancing: true,
            installments: 48,
            startDate: "2025-11-08",
            tax: 25.5,
            downPayment: "1500"
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("downPayment must be a number");
    });

    //Todos os campos com formato inválido
    it("All fields with invalid format", async () => {
        const allocation = {
            name: 1234,
            value: "1000",
            hasFinancing: "true",
            installments: "48",
            startDate: "2025/11/08",
            tax: "25.5",
            downPayment: "1500"
        }
    
        const response = await request(app)
            .post(`/api/allocation/fixed-asset/${userId}`)
            .send(allocation);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string, value must be a number, hasFinancing must be a boolean, installments must be a number, startDate must be in YYYY-MM-DD format, tax must be a number, downPayment must be a number");
    });

    //Teste dos gets

    //Busca de allocation com um id inválido
    it("Allocation with invalid id", async () => {
        const response = await request(app)
            .get(`/api/allocation/allocation-id`);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Allocation not found");
    });

    //Busca de allocation com um id
    it("Get allocation by id", async () => {
        const response = await request(app)
            .get(`/api/allocation/${allocationId}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("person");
        expect(response.body).toHaveProperty("financialAllocation");
        expect(response.body).toHaveProperty("fixedAssetAllocation");
    });

    //Busca de todas allocation com um person id inválido
    it("Get all allocation by invalid person id", async () => {
        const response = await request(app)
            .get(`/api/allocation/all/invalid-person-id}`);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Busca de todas allocation com um person id válido
    it("Get all allocation by person id", async () => {
        const response = await request(app)
            .get(`/api/allocation/all/${userId}`);
    
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

afterAll(async () => {
  if(MySQLDataSource.isInitialized) {
    await MySQLDataSource.destroy();
  }
});