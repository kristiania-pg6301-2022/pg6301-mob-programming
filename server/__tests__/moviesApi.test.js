import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { MoviesApi } from "../moviesApi.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

beforeAll(async () => {
  const mongoClient = new MongoClient(process.env.ATLAS_URL);
  await mongoClient.connect();
  app.use("/api/movies", MoviesApi(mongoClient.db("sample_mflix")));
});

describe("Api for movies", () => {
  it("should list existing movies", async function () {
    expect(
      (await request(app).get("/api/movies").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("My Joy");
  });
});
