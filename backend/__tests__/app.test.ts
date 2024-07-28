import { app } from "../app";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import { db } from "../db/connection";
import { seed } from "../db/seed";
import { createUser } from "../models";
import jwt from "jsonwebtoken";

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed();
});

describe("API", () => {
  describe("POST /user/register", () => {
    test("POST 200: Responds with the posted user's id", () => {
      return request(app)
        .post("/user/register")
        .send({
          username: "Sara",
          email: "test@gmail.com",
          password: "Test1",
        })
        .expect(200)
        .then(({ body, headers }) => {
          console.log(headers);
          const { user } = body;

          expect(user).toMatchObject({
            user_id: 6,
          });
          expect(headers).toMatchObject({
            location: "/user/6",
          });
        });
    });

    test("POST 400: Responds with an adequate status and error message when provided with malformed body", () => {
      return request(app)
        .post("/user/register")
        .send({ username: "Sara", email: "test@gmail.com" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("A validation error has occurred");
        });
    });

    test("POST 400: Responds with an adequate status and error message when the data type of the body's property values are not correct", () => {
      return request(app)
        .post("/user/register")
        .send({
          username: 77,
          email: 77,
          password: 3,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("A validation error has occurred");
        });
    });

    test("POST 409: Responds with an adequate status and error message when the user already exists", () => {
      db.query(
        `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING *`,
        ["Sara", "test@gmail.com", "test1"]
      ).then(() => {
        return request(app)
          .post("/user/register")
          .send({
            username: "Sara",
            email: "test@gmail.com",
            password: "Test",
          })
          .expect(409)
          .then(({ body }) => {
            expect(body.message).toBe(
              "Resource of type 'user' already exists from 'test@gmail.com'"
            );
          });
      });
    });
  });

  describe("POST /user/login", () => {
    test("POST 200: Responds with the logged user's id'", () => {
      return createUser("clairemuir", "claire@gmail.com", "PasswordTest1").then(
        () => {
          return request(app)
            .post("/user/login")
            .send({
              email: "claire@gmail.com",
              password: "PasswordTest1",
            })
            .expect(200)
            .then(({ body }) => {
              const { token } = body;

              const secret = process.env.JWT_SIGNING_KEY!;
              const payload = jwt.verify(token, secret);

              expect(payload).toMatchObject({
                user_id: 6,
              });
            });
        }
      );
    });

    test("POST 400: Responds with an adequate status and error message when provided with malformed body", () => {
      return request(app)
        .post("/user/login")
        .send({ email: "john23@test.com" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("A validation error has occurred");
        });
    });

    test("POST 400: Responds with an adequate status and error message when the data type of the body's property values are not correct", () => {
      return request(app)
        .post("/user/login")
        .send({
          email: 77,
          password: 3,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("A validation error has occurred");
        });
    });

    test("POST 404: Responds with an adequate status and error message when the user does not exist", () => {
      return request(app)
        .post("/user/login")
        .send({
          email: "sara@test.com",
          password: "test",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(
            "Could not find resource of type 'user' from 'sara@test.com'"
          );
        });
    });

    test("POST 400: Responds with an adequate status and error message when the password provided does not match", () => {
      return createUser("laurasmith", "laura@test.com", "PasswordTest1").then(
        () => {
          return request(app)
            .post("/user/login")
            .send({
              email: "laura@test.com",
              password: "PasswordTest2",
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe(
                "Incorrect password provided for user with email laura@test.com"
              );
            });
        }
      );
    });
  });

  describe("GET /user/:id", () => {
    test("GET 401: Responds with adequate code when there is no authorisation header", () => {
      return request(app).get("/user/1").expect(401);
    });

    test("GET 401: Responds with adequate code when there is an invalid authorisation header", () => {
      return request(app).get("/user/1").set({ authorization: "" }).expect(401);
    });

    test("GET 403: Responds with adequate code when the authorisation header is a malformed token", () => {
      return request(app)
        .get("/user/1")
        .set({ authorization: "invalidtoken" })
        .expect(403);
    });

    test("GET 403: Responds with adequate code when there is a valid token with an invalid signature", () => {
      const untrustedToken = jwt.sign({ user_id: 1 }, "invalidsecret");

      return request(app)
        .get("/user/1")
        .set({ authorization: untrustedToken })
        .expect(403);
    });

    test("GET 403: Responds with an adequate code when the given token has expired", () => {
      const expiredToken = jwt.sign(
        { user_id: 1 },
        process.env.JWT_SIGNING_KEY!,
        { expiresIn: "-1h" }
      );

      return request(app)
        .get("/user/1")
        .set({ authorization: expiredToken })
        .expect(403);
    });

    test("GET 403: Responds with an adequate code when the given token is valid, but for a different user", () => {
      const wrongToken = jwt.sign(
        { user_id: 1 },
        process.env.JWT_SIGNING_KEY!,
        { expiresIn: "1h" }
      );

      return request(app)
        .get("/user/2")
        .set({ authorization: wrongToken })
        .expect(403);
    });

    test("GET 200: Responds with the required user object", () => {
      const validToken = jwt.sign(
        { user_id: 1 },
        process.env.JWT_SIGNING_KEY!,
        { expiresIn: "1h" }
      );

      return request(app)
        .get("/user/1")
        .set({ authorization: validToken })
        .expect(200)
        .then(({ body }) => {
          const { user } = body;

          expect(user.username).toBe("John23");
          expect(user.email).toBe("john23@test.com");
        });
    });

    test("GET 404: Responds with an adequate status and error message when given a non-existent id", () => {
      const validToken = jwt.sign(
        { user_id: 99 },
        process.env.JWT_SIGNING_KEY!,
        { expiresIn: "1h" }
      );

      return request(app)
        .get("/user/99")
        .set({ authorization: validToken })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(
            "Could not find resource of type 'user' from '99'"
          );
        });
    });

    test("GET 400: Responds with an error when passed an id of an invalid data type", () => {
      const validToken = jwt.sign(
        { user_id: "invalid-id" },
        process.env.JWT_SIGNING_KEY!,
        { expiresIn: "1h" }
      );

      return request(app)
        .get("/user/invalid-id")
        .set({ authorization: validToken })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("A validation error has occurred");
        });
    });
  });
});
