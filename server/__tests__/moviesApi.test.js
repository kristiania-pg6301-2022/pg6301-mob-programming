import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { MoviesApi } from "../moviesApi.js";

const app = express();
app.use(bodyParser.json());
let mongoClient;

beforeAll(async () => {
  dotenv.config();
  mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect();
  const database = mongoClient.db("unit_tests");
  await database.collection("movies").deleteMany({});
  app.use("/api/movies", MoviesApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("movies api", () => {
  it("should list saved movies", async () => {
    const title = "Egyptian movie as of " + new Date();
    await request(app)
      .post("/api/movies")
      .send({ title, year: 2022, country: "Egypt" })
      .expect(200);

    const listResponse = await request(app).get("/api/movies").expect(200);
    expect(listResponse.body.map(({ title }) => title)).toContain(title);
  });

  it("should filter movies by country", async () => {
    const title = "Norwegian movie as of " + new Date();
    await request(app)
      .post("/api/movies")
      .send({ title, year: 2022, country: "Norway" })
      .expect(200);

    expect(
      (await request(app).get("/api/movies?country=Norway")).body.map(
        ({ title }) => title
      )
    ).toContain(title);

    expect(
      (await request(app).get("/api/movies?country=Sweden")).body.map(
        ({ title }) => title
      )
    ).not.toContain(title);
  });
});
