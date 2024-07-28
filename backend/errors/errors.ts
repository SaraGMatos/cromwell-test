export class ApiError extends Error {
  #statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.#statusCode = statusCode;
  }

  get statusCode(): number {
    return this.#statusCode;
  }
}

export class UnauthorisedError extends ApiError {
  constructor(resource: string) {
    super(403, `Unauthorised access to resource '${resource}'`);
  }
}

export class UnauthenticatedError extends ApiError {
  constructor() {
    super(401, `Request must be authenticated`);
  }
}

export class AlreadyExistsError extends ApiError {
  constructor(resource: string, email: string) {
    super(409, `Resource of type '${resource}' already exists from '${email}'`);
  }
}

export class InvalidPasswordError extends ApiError {
  constructor(email: string) {
    super(400, `Incorrect password provided for user with email ${email}`);
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, id: string) {
    super(404, `Could not find resource of type '${resource}' from '${id}'`);
  }
}

export class ValidationError extends ApiError {
  constructor() {
    super(400, "A validation error has occurred");
  }
}

export class ApplicationConfigurationError extends ApiError {
  constructor(configuration: string) {
    super(500, `Configuration of type '${configuration}' is missing`);
  }
}
