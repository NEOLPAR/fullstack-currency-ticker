const request = require("supertest");
const app = require("../../src/app");
const currencyData = require('./currencyData')
const helpers = require('../../src/helpers')

describe("GET /api/currency/:date", () => {
  beforeEach(() => jest.resetModules());

  it("should return http 404 if no date", async () => {
    const response = await request(app).get("/api/currency").expect(404);
  });

  it("should return http 500 if date input cannot be parsed as date", async () => {
    const response = await request(app).get("/api/currency/wrongInput").expect(500);
    const expected = {
      error: "Date param is wrong"
    }

    expect(response.body).toEqual(expected);
  });

  it("should return http 500 if date format is wrong", async () => {
    const response = await request(app).get("/api/currency/10-01-2017").expect(500);
    const expected = {
      error: "Date has wrong format"
    }

    expect(response.body).toEqual(expected);
  });

  it("should return http 200 with empty array when data was not found", async () => {
    const response = await request(app).get("/api/currency/2017-01-11").expect(200);

    expect(response.body).toEqual([]);
  });

  it("should return http 200 with data when there is data", async () => {
    const helpersMock = jest.spyOn(helpers, 'getCurrencies').mockReturnValueOnce(currencyData.mockData)

    const response = await request(app).get("/api/currency/2017-01-02").expect(200);
    const expected = currencyData.previousDateHasValue

    expect(response.body).toStrictEqual(expected);
    expect(helpersMock).toHaveBeenCalled()
  });

  it("should return http 200 with data when there is data and there is no previous day", async () => {
    const helpersMock = jest.spyOn(helpers, 'getCurrencies').mockReturnValueOnce(currencyData.mockData)

    const res = await request(app).get("/api/currency/2017-01-01").expect(200);
    const expected = currencyData.previousDayNotvalue

    expect(res.body).toEqual(expected);
    expect(helpersMock).toHaveBeenCalled()
  });
});

describe("GET /api/currency/available", () => {
  it("should return http 200 with data", async () => {
    const helpersMock = jest.spyOn(helpers, 'getCurrencies').mockReturnValueOnce(currencyData.mockData)

    const res = await request(app).get("/api/currency/available").expect(200);
    const expected = currencyData.mockResponseAvailable

    expect(res.body).toEqual(expected);
    expect(helpersMock).toHaveBeenCalled()
  });
});
