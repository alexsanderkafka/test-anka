import request from "supertest";
import { app } from "../../src/app";
import { MySQLDataSource } from "../../src/configs/DataBaseConfig";

let insuranceCreated: any;
const userId: string = "526acda8-99e4-421c-8754-658523725c48"

beforeAll(async () => {
    if(!MySQLDataSource.isInitialized){
        await MySQLDataSource.initialize();
    }

    const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send({
                name: "Criado no teste automático",
                startDate: "2025-11-08",
                duration: 100,
                monthlyValue: 500.50,
                insuredValue: 600000
            });

    insuranceCreated = response.body;
});

describe(("InsuranceController"), () => {
    
    //Criando um novo registro
    it("New insurance", async () => {
        const insurance: any = {
            name: "Criado no teste automático",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("startDate");
        expect(response.body).toHaveProperty("duration");
        expect(response.body).toHaveProperty("monthlyValue");
        expect(response.body).toHaveProperty("insuredValue");
    });

    //Campo name vazio
    it("Empty name", async () => {
        const insurance: any = {
            name: "",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name is required");
    });

    //Campo name formato inválido
    it("Name field with invalid format", async () => {
        const insurance: any = {
            name: 2334,
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name must be a string");
    });

     //Campo startDate vazio
    it("Empty startDate", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate is required, startDate must be in YYYY-MM-DD format, startDate must be a string");
    });

    //Campo startDate formato inválido
    it("Start date field with invalid format", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025/11/08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate must be in YYYY-MM-DD format");
    });

    //Campo duration vazio
    it("Empty duration", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("duration is required, duration must be a number");
    });

    //Campo duration formato inválido
    it("Duration with invalid format", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: "100",
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("duration must be a number");
    });

    //Campo monthlyValue vazio
    it("Empty monthlyValue", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("monthlyValue is required, monthlyValue must be a number");
    });

    //Campo monthlyValue formato inválido
    it("Monthly value with invalid format", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: "500.50",
            insuredValue: 600000
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("monthlyValue must be a number");
    });

    //Campo insuredValue vazio
    it("Empty insuredValue", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("insuredValue is required, insuredValue must be a number");
    });

    //Campo insuredValue formato inválido
    it("Insured value with invalid format", async () => {
        const insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: "600000"
        }
            
        const response = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("insuredValue must be a number");
    });

    //Teste dos endpoints de GET

    //Buscando um insurance pelo externalId
    it("Find one insurance", async () => {
        const response = await request(app)
            .get(`/api/insurance/${insuranceCreated.externalId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("startDate");
        expect(response.body).toHaveProperty("duration");
        expect(response.body).toHaveProperty("monthlyValue");
        expect(response.body).toHaveProperty("insuredValue");
    });

    //Buscando um insurance com externalId inexistente
    it("Find one insurance with invalid externalId", async () => {
        const response = await request(app)
            .get(`/api/insurance/invalid-external-id`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Insurance not found");
    });

    //Buscando todos os insurance de um usuário
    it("Find all insurance", async () => {
        const response = await request(app)
            .get(`/api/insurance/all/${userId}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    //Buscando todos os insurance de um usuário inexistente
    it("Find all insurance with invalid user id", async () => {
        const response = await request(app)
            .get(`/api/insurance/all/invalid-user-id`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    //Testando o endpoint de UPDATE

    //Atualizando um insurance
    it("Update one insurance", async () => {
        let insurance: any = {
            name: "Seguro do carro atualizado",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("externalId");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("startDate");
        expect(response.body).toHaveProperty("duration");
        expect(response.body).toHaveProperty("monthlyValue");
        expect(response.body).toHaveProperty("insuredValue");
    });

     //Atualizando um insurance com id inexistente
    it("Update one insurance", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/invalid-insurance-id`)
            .send(insurance);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Insurance not found"); 
    });

    //Atualizando um insurance com name vazio
    it("Update one insurance with empty name", async () => {
        let insurance: any = {
            name: "",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name is required");
    });

    //Atualizando um insurance com name inválido
    it("Update one insurance with invalid name", async () => {
        let insurance: any = {
            name: 2222,
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name must be a string");
    });

    //Atualizando um insurance com startDate vazio
    it("Update one insurance with empty startDate", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate is required, startDate must be in YYYY-MM-DD format");
    });

    //Atualizando um insurance com startDate inválido
    it("Update one insurance with invalid startDate", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025/11/08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("startDate must be in YYYY-MM-DD format");
    });

    //Atualizando um insurance com duration vazio
    it("Update one insurance with empty duration", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: "",
            monthlyValue: 500.50,
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("duration is required, duration must be a number");
    });

    //Atualizando um insurance com duration inválido
    it("Update one insurance with invalid duration", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: "100",
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("duration must be a number");
    });

    //Atualizando um insurance com monthlyValue vazio
    it("Update one insurance with empty monthlyValue", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: "",
            insuredValue: 600000
        }
        
        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("monthlyValue is required, monthlyValue must be a number");
    });

     //Atualizando um insurance com monthlyValue inválido
    it("Update one insurance with invalid monthlyValue", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: "500.50",
            insuredValue: 600000
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("monthlyValue must be a number");
    });

    //Atualizando um insurance com insuredValue vazio
    it("Update one insurance with empty insuredValue", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: ""
        }

        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("insuredValue is required, insuredValue must be a number");
    });

    //Atualizando um insurance com insuredValue inválido
    it("Update one insurance with invalid insuredValue", async () => {
        let insurance: any = {
            name: "Seguro do carro",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: "600000"
        }
        
        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("insuredValue must be a number");
    });

    //Atualizando um insurance com todos os campos vazios
    it("Update one insurance with empty insuredValue", async () => {
        let insurance: any = {
            name: "",
            startDate: "",
            duration: "",
            monthlyValue: "",
            insuredValue: ""
        }
    
        const response = await request(app)
            .put(`/api/insurance/${insuranceCreated.externalId}`)
            .send(insurance);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("name is required, startDate is required, startDate must be in YYYY-MM-DD format, duration is required, duration must be a number, monthlyValue is required, monthlyValue must be a number, insuredValue is required, insuredValue must be a number");
    });

    //Testando o endpoint de DELETE

    //Deletando um insurance
    it("Delete one insurance", async () => {
        const insurance: any = {
            name: "Criado no teste para deletar",
            startDate: "2025-11-08",
            duration: 100,
            monthlyValue: 500.50,
            insuredValue: 600000
        }
            
        const savedInsurance = await request(app)
            .post(`/api/insurance/${userId}`)
            .send(insurance);
            
        expect(savedInsurance.statusCode).toBe(201);

        const response = await request(app)
            .delete(`/api/insurance/${savedInsurance.body.externalId}`);

        expect(response.statusCode).toBe(204);
    });
    
});

afterAll(async () => {
    await request(app).delete(`/api/insurance/${insuranceCreated.externalId}`);

    if(MySQLDataSource.isInitialized) {
        await MySQLDataSource.destroy();
    }
});