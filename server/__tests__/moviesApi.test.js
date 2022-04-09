import request from "supertest";
import express from "express";

const app = express();

describe("Api for movies", () => {
  it("should list existing movies", function () {
    request(app).get("/api/movies").expect(200);
  });
});
