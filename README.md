# Cromwell Technical Test - Junior Full Stack Software Engineer

This project is a technical test for the Junior Full Stack Software Engineer position at Cromwell. Due to time constraints, it has been developed over three days. The following provides you a breakdown of the project and how to run it.

## Technologies

The following technologies have been used to develop this mini product:

For the REST API:

- [Postrgress SQL](https://www.postgresql.org/), a relational database engine
- [NodeJs](), the JS runtime
- [ExpressJs](https://expressjs.com/), for the REST API infrastructure
- [bcrypt](https://www.npmjs.com/package/bcrypt), a JS library for hashing passwords
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), a JS library for generating, signing and validating [Json Web Tokens (JWTs)](<https://developer.okta.com/blog/2020/12/21/beginners-guide-to-jwt#:~:text=A%20JWT%20is%20a%20structured,JSON%20Web%20Encryption%20(JWE)>)
- [Supertest](https://www.npmjs.com/package/supertest), a JS library for integration testing REST Apis
- [Jest](https://jestjs.io/), a JS testing framework
- [Postman](postman.com), a developer tool for interacting with APIs

For the client-side single page application (SPA):

- [React](https://react.dev/), a modern JS library for developing component-driven applications
- [Typescript](https://www.typescriptlang.org/), a strongly-typed programming language built on top of Javascript
- [jwt-decode](https://www.npmjs.com/package/jwt-decode), a client-side JS library for decoding JWTs
- [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework for styling web applications

## Overview

There are thee main parts to this application:

1. Data storage

User data, such as e-mail, username & passwords are stored in a relational database using PostgreSQL, which is hosted in ElephantSQL.

The Postgres instance hosted in ElephantSQL has been configured with a single database (cromwell_test). I am aware that usually we would have different databases for different environments, but I ran into some issues with ElephantSQL.

2. The REST API

A REST API served using NodeJs and ExpressJS that leverages JWTs for providing stateless authentication with the API.

3. Client Application

A client application in the form of a single-page application (SPA) using ReactJs for interacting with the REST API. It uses Axios to make http request from the client side.

## Production Deployment

This mini project can be accessed at the production deployment hosted on https://cromwelltest.netlify.app

It has been deployed from the production branch as a way to protect the deployment against pushes to master branch.

Please bear in mind that it may respond slowly on the initial requests as the server spins down with inactivity.

Use the following link to register: https://cromwelltest.netlify.app/register

After registration, you will be redirected to the login page, where you will be able to enter your credentials and access the landing page.

Alternatively, you could use my credentials to login directly at https://cromwelltest.netlify.app/login

| Email                     | Password      |
| ------------------------- | ------------- |
| saragarciamatos@gmail.com | Passwordtest1 |

## Local Deployment

To avoid having to install postgres locally on your developer machines, by default, the development environment is configured to use a development database hosted in [Elephant SQL]().

(It would be best to use a local database, but for the purpose of this project using a hosted database makes local deployment simpler - i.e. not needing to install psql in your machine).

### Run the REST API

Follow these instructions to run the REST API locally

1. Install dependencies

   ```shell
   [ </path/to/repo>/backend ] npm install
   ```

2. Deploy the REST API

   ```shell
   [ </path/to/repo>/backend ] npm run dev
   ```

3. Setup the database

   ```shell
   [ </path/to/repo>/backend ] npm run seed-dev
   ```

#### Running API tests

A suite of tests has been developed (see [app.test](./backend/src/__tests__/app.test.ts)) using Supertest and Jest.

Execute the tests with the following command:

```shell
 [ </path/to/repo>/backend ] npm test
```

### Run the Client Application

Follow these instructions to run the client application locally

1. Install dependencies

   ```
   [ </path/to/repo>/frontend ] npm install
   ```

2. Deploy the application

   ```shell
   [ </path/to/repo>/frontend ] npm run dev
   ```

3. Open the application

   Navigate to the deployed application on http://localhost:5173/

## Development Summary

What you will find:

- Postgres SQL used as a backing database
  - Created a simple table for storing user information
  - Provide the schema for the table
- REST API written with NodeJS
  - Rest endpoints created
    - Performs body validation
  - Uses JWTs to provide stateless authentication with the REST API
    - Signed using a secret SIGNING key
    - Encapsulates information about the user (user_id for now)
  - Uses bcrypt to hash passwords before saving them in the database
  - Provided some basic integration tests with Supertest
- Frontend written in ReactJS
  - Mobile friendly UI
  - Login page (/login)
    - Supports logging users in
    - Perfoms user input validation
    - Provides user feedback from server responses
  - Registration page (/register)
    - Supports registering new users with the system
    - Performed user input validation
    - Redirects users to the login page once registered in the system
  - Home page (/)
    - Displays user details after logging in (such as e-mail, username)
    - Redirects to the login page if the user is not authenticated
    - Supports a logout mechanism, clearing local storage
  - About page (/about)
    - An extremely simple About page with some dummy content
  - Authentication mechanism using JWTs
    - JWTs are persisted to local storage to support user sessions
    - JWT contains expiry date information
    - User stays logged in on refresh of the page
  - Application styling done using the open-source tailwind CSS

## Improvements

- More and improved testing
- The JWT could contain more information about the user
- Auto logout when the JWT expires
- .env files aren't typically checked into git (except for development & test)

## Known Issues

- Did not have the time I would have wanted to work on this better (React components, UI, backend, deployment)
