import request from "supertest";
import { Connection } from "typeorm";


import createConnection from "../../../../database/index";
import { app } from '../../../../app';

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate a user", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        name: "lucas marcell",
        email: "lmarcell18@gmail.com",
        password: "senha"
      });

    const response = await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "lmarcell18@gmail.com",
        password: "senha"
      });

    expect(response.status).toBe(200);
  });
});
