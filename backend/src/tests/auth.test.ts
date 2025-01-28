import request from "supertest";
import app from "../app";

let server: any;

beforeAll(() => {
  // Start the server on a different port for tests
  server = app.listen(5001);
});

afterAll(() => {
  // Close the server after tests
  server.close();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "password" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
