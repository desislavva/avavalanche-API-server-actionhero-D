
import jestOpenApi from "jest-openapi";
import * as path from "path";
import axios from "axios";

require('dotenv').config()
jest.setTimeout(50000);

jestOpenApi(path.join(__dirname, "../openapi/openapi.yml"));

describe("GET /api/network", () => {
  it("should satisfy OpenAPI spec", async () => {
    const res = await axios.get(`http://${process.env.SERVER_ADDRESS}/api/network`);

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/address/hash/{hash}", () => {
  it("should satisfy OpenAPI spec", async () => {
    const hash = "X-fuji1xpmx0ljrpvqexrvrj26fnggvr0ax9wm32gaxmx";
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/address/hash/${hash}`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/blocks/hash/{hash}", () => {
  it("should satisfy OpenAPI spec", async () => {
    const hash =
      "0x0bcd0c4e5635f21dd4352aa82692a5e29bcf2c5373da9427e5ab38bd4c7cfd33";
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/blocks/hash/${hash}`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/blocks/number/{blockNumber}", () => {
  it("should satisfy OpenAPI spec", async () => {
    const blockNumber = 1940150;
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/blocks/number/${blockNumber}`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/transactions/hash/{hash}", () => {
  it("should satisfy OpenAPI spec", async () => {
    const hash =
      "0x118e1747566adeaab6afede9de76ebeb5b10bb56ec510a099fb5a82221e9d0e7";
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/transactions/hash/${hash}`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/transactions/{address}/{n}/{x}", () => {
  it("should satisfy OpenAPI spec", async () => {
    const address = "X-fuji1xpmx0ljrpvqexrvrj26fnggvr0ax9wm32gaxmx";
    const n = 10;
    const x = 5;
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/transactions/${address}/${n}/${x}`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/transactions/{n}/{x}", () => {
  it("should satisfy OpenAPI spec", async () => {
    const n = 10;
    const x = 5;
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/transactions/${n}/${x}`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/transactions/recentxchain", () => {
  it("should satisfy OpenAPI spec", async () => {
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/transactions/recentxchain`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe("GET /api/transactions/recentpchain", () => {
  it("should satisfy OpenAPI spec", async () => {
    const res = await axios.get(
      `http://${process.env.SERVER_ADDRESS}/api/transactions/recentpchain`
    );

    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});
