import request from "supertest";
import { app } from "../../src/app";
import { MySQLDataSource } from "../../src/configs/DataBaseConfig";

beforeAll(async () => {
    if(!MySQLDataSource.isInitialized){
        await MySQLDataSource.initialize();
    }
});

describe(("AuthController"), () => {

    //Teste de usuário que já existe no banco de dados
    it("User already exists", async () => {
        const user = {
            name: "Maria Silva",
            email: "maria.teste@gmail.com",
            password: "teste13"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("User with this email already exists");
    });

    //Campo de name em branco
    it("Empty name field", async () => {
        const user = {
            name: "",
            email: "maria.teste@gmail.com",
            password: "teste13"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        
        console.log("---------Response body:---------", response.body);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required");
    });

    //E-mail inválido
    it("Invalid email", async () => {
        const user = {
            name: "Maria Silva",
            email: "maria.teste",
            password: "teste13"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email format");
    });

    //Password em branco
    it("Empty password field", async () => {
        const user = {
            name: "Maria Silva",
            email: "maria.teste@gmail.com",
            password: ""
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("password should not be empty");
    });

    //Todos os campos em branco
    it("Empty fields", async () => {
        const user = {
            name: "",
            email: "",
            password: ""
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name is required, Invalid email format, email should not be empty, password should not be empty");
    });

    //campo de nome com formato inválido
    it("Name with invalid format", async () => {
        const user = {
            name: 1234,
            email: "maria.teste@gmail.com",
            password: "teste13"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string");
    });

    //campo password com formato inválido
    it("Password with invalid format", async () => {
        const user = {
            name: "Maria Silva",
            email: "maria.teste@gmail.com",
            password: 1234
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("password must be a string");
    });

    //Campo de email no formato de número
    it("Email field with number format", async () => {
        const user = {
            name: "Maria Silva",
            email: 1234,
            password: "teste123"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email format, email must be a string");
    });

    //Todos os campos com formato inválido
    it("Invalid fields", async () => {
        const user = {
            name: 1234,
            email: 12354,
            password: 21345
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string, Invalid email format, email must be a string, password must be a string");
    });

    //Password e name com formato inválido
    it("Password and name with invalid format", async () => {
        const user = {
            name: 1234,
            email: "maria.teste@gmail.com",
            password: 21345
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string, password must be a string");
    });

    //Name e email com formato inválido
    it("Name and email with invalid format", async () => {
        const user = {
            name: 1234,
            email: 1234,
            password: "teste123"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Name must be a string, Invalid email format, email must be a string");
    });

    //Email e password com formato inválido
    it("Emali and password with invalid format", async () => {
        const user = {
            name: "Maria Silva",
            email: 1234,
            password: 1234
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email format, email must be a string, password must be a string");
    });
});

afterAll(async () => {
  if(MySQLDataSource.isInitialized) {
    await MySQLDataSource.destroy();
  }
});