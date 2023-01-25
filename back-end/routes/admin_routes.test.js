const request = require("supertest");
const app  = require("../app");

describe("Admin Routes", () => {
  test("AUTHORIZED GET /admin", async () => {
    const response = await request(app)
      .get("/admin")
      .set("Cookie", "admin_token=eyJhbGciOiJIUzI1NiJ9.c2hlZmZlcnN0cm9rZTAzMDQxOTk4.VE4qsoPuWLbJduJ-Ck776iqdiZE6fV8vq5XDNgH3WCE")
    expect(response.status).toBe(200);
    expect(response.text).toBe("Admin Panel");
  });

  test("UNAUTHORIZED GET /admin", async () => {
    const response = await request(app)
      .get("/admin")
    expect(response.status).toBe(401);
    expect(response.text).toBe("{\"message\":\"unauthorized\"}");
  });

  test("AUTHORIZED POST /admin/login", async () => {
    const mockAdmin = {
      username: `${process.env.USERNAME}`,
      password: `${process.env.SECRET_KEY}`,
    };
    const response = await request(app)
      .post("/admin/login")
      .send(mockAdmin);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: "valid_token" });
  });

  test("UNAUTHORIZED POST /admin/login", async () => {
    const mockAdmin = {
      username: `random`,
      password: `dfnsjfhdsjkj`,
    };
    const response = await request(app)
      .post("/admin/login")
      .send(mockAdmin);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid username or password" });
  });

  test("AUTHORIZED GET /admin/logout", async () => {
    const response = await request(app)
      .get("/admin/logout")
      .set("Cookie", "admin_token=eyJhbGciOiJIUzI1NiJ9.c2hlZmZlcnN0cm9rZTAzMDQxOTk4.VE4qsoPuWLbJduJ-Ck776iqdiZE6fV8vq5XDNgH3WCE");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Logged out");
  });

  test("UNAUTHORIZED GET /admin/logout", async () => {
    const response = await request(app)
      .get("/admin/logout")
    expect(response.status).toBe(401);
    expect(response.text).toBe("{\"message\":\"unauthorized\"}");
  });
});