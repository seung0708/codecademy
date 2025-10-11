import supertest from "supertest";
import app from "../app.js";

export const agent = supertest.agent(app);
