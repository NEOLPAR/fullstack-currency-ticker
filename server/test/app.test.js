const request = require("supertest");
const app = require("../src/app");

describe("GET /random-url", () => {
  it("should return 404", async () => {
    await request(app).get("/reset").expect(404);
  });
});

describe("GET /healthz", () => {
  it("should return http 200 with healthy", async () => {
    const response = await request(app).get("/api/healthz").expect(200);
    expect(response.body).toEqual("healthy");
  });
});
