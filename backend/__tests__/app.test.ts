import { app } from "../app";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";

describe("API", () => {
  describe("/user/register", () => {
    test("POST 200: Responds with the posted user object and its required keys", () => {
      return request(app)
        .post("/user/register")
        .send({
          username: "Sara",
          email: "saragarciamatos@gmail.com",
          password: "Mocha",
        })
        .expect(200)
        .then(({ body }) => {
          const { user } = body;

          expect(user).toMatchObject({
            username: "Sara",
            email: "saragarciamatos@gmail.com",
            password: "Mocha",
          });
        });
    });
  });
});
