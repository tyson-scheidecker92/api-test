const request = require("supertest");
const { app, server } = require("../server");

describe("GET /time", () => {
  afterAll(async () => {
    server.close();
  });

  it("should return current time in UTC", async () => {
    const response = await request(app).get("/time");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentTime");
    expect(response.body.currentTime).toMatch(
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)$/
    );
  });

  it("should return adjusted time when timezone is provided", async () => {
    const response = await request(app).get("/time?timezone=America/New_York");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("adjustedTime");
    expect(response.body.adjustedTime).toMatch(
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)$/
    );
  });

  it("should handle invalid timezone gracefully", async () => {
    const response = await request(app).get("/time?timezone=Invalid/Timezone");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentTime");
  });
});
