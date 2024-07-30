# Cromwell Technical Test - Junior Full Stack Software Engineer

## Technologies

The following technologies have been used to develop this mini product:

For the REST Api:

- [Postrgress SQL](https://www.postgresql.org/), a relational database engine
- [NodeJs](), the JS runtime
- [ExpressJs](https://expressjs.com/), for the REST api infrastructure
- [bcrypt](https://www.npmjs.com/package/bcrypt), a JS library for hashing passwords
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), a JS library for generating, signing and validating [Json Web Tokens (JWTs)](<https://developer.okta.com/blog/2020/12/21/beginners-guide-to-jwt#:~:text=A%20JWT%20is%20a%20structured,JSON%20Web%20Encryption%20(JWE)>)
- [Supertest](https://www.npmjs.com/package/supertest), a JS library for integration testing REST Apis
- [Jest](https://jestjs.io/), a JS testing framework
- [Postman](), a developer tool for interacting with APIs

For the client-side single page application (SPA):

- [React](https://react.dev/), a modern JS library for developing component-driven applications
- [Typescript](https://www.typescriptlang.org/), a strongly-typed programming language built on top of Javascript
- [jwt-decode](https://www.npmjs.com/package/jwt-decode), a client-side JS library for decoding JWTs
- [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework for styling web applications

## Overview

There are thee main parts to this application:

1. Data storage

User data, such as e-mail, username & passwords are stored in a relational database using PostgreSQL.

2. The REST Api

A REST Api served using NodeJs and ExpressJS and leverages JWTs for providing stateless authentication with the Api.

3. Client Application

A client application in the form of a single-page application (SPA) using ReactJs for interacting with the REST Api.

## Production Deployment

This mini project can be accessed at the pre-production deployment hosted on https://cromwelltest.netlify.app

Use the following link to register: https://cromwelltest.netlify.app/register

After registration, you will be redirected to the login page, where you will be able to enter your credentials and access the landing page.

Alternatively, you could use my credentials to login directly at https://cromwelltest.netlify.app/login

| Email                     | Password      |
| ------------------------- | ------------- |
| saragarciamatos@gmail.com | Passwordtest1 |

## Local Deployment

To avoid having to install postgres locally on your developer machines, by default, the development environment is configured to use a development database hosted in [Elephant SQL]().

(It would be best to use a local DB, but for the purpose of this project using a hosted DB makes local deployment simpler).

### Run the REST Api

Follow these instructions to run the REST API locally

1. Install dependencies

   ```shell
   [ </path/to/repo>/backend ] npm run install
   ```

2. Deploy the REST Api

   ```shell
   [ </path/to/repo>/backend ] npm run start-dev
   ```

3. Setup the database

   ```shell
   [ </path/to/repo>/backend ] :command:
   ```

### Run the Client Application

Follow these instructions to run the client application locally

1. Install dependencies

   ```
   [ </path/to/repo>/frontend ] npm run install
   ```

2. Deploy the application

   ```shell
   [ </path/to/repo>/frontend ] npm run dev
   ```

3. Open the application

   Navigate to the deployed application on http://localhost:5741/

   Login to the development application using any one of the following development users accounts:

   | Username | Password |
   | -------- | -------- |
   | x        | x        |

## Development Summary

What you will find:

- Postrgress SQL used as a backing database
  - Created a simple table for storing user information
  - Provide the schema for the table
- REST API written with NodeJS
  - Rest endpoints created
    - Performs body validation (zero-trust)
  - Uses JWTs to provide stateless authentication with the REST API
    - Signed using a secret SIGNING key
    - Encapsulates information about the user (user_id for now)
  - Uses bcrypt to hash passwords before saving them in the database
  - Provided some basic integration tests with supertest
- Frontend written in React JS
  - Mobile friendly UI
  - Login page
    - Supports logging users in
    - Perfoms user input validation
    - Provides user feedback from server responses
  - Registration page
    - Supports registering new users with the system
    - Performed user input validation
    - Redirects users to the login page once registered in the system
  - Home page
    - Displays user details after logging in (such as e-mail, username)
    - Redirects to the login page if the user is not authenticated
  - About page
  - Authentication mechanism using JWTs
    - JWTs are persisted to local storage to support user sessions
    - JWT contains expiry date information
    - User stays logged in on refresh of the page
    - Supports a logout mechanism, clearing local storage
  - Application styling done using the open-source tailwind CSS

## Improvements

- Unit testing (TDD, functions, components)
- Security considersations (JWTs, exposure to XSS)
- Deployment improvements
- Using a salt over rounds
- The JWT could contain more information about the user
- Auto logout when the JWT expires
- .env files aren't typically checked into git (except for development & test)

## Known Issues

- Didn't have the time I wanted to work on this better (UI, backend, deployment)

## Running this locally
