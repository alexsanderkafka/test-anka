import request from "supertest";
import { app } from "../../src/app";
import { MySQLDataSource } from "../../src/configs/DataBaseConfig";

beforeAll(async () => {
    if(!MySQLDataSource.isInitialized){
        await MySQLDataSource.initialize();
    }
});

describe(("AuthController"), () => {

    it("Create new user", async () => {
        
        const user = {
            name: "Maria Silva",
            email: "maria.teste@gmail.com",
            password: "teste13"
        }

        const response = await request(app)
            .post("/api/auth/create")
            .send(user);

        console.log(response.body);

        expect(response.statusCode).toBe(409);
    });
});

afterAll(async () => {
  if(MySQLDataSource.isInitialized) {
    await MySQLDataSource.destroy();
  }
});