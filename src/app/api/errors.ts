export class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ConfigurationError extends HTTPError {
  constructor(message: string) {
    super(500, message);
  }
}

export class UnauthorizedError extends HTTPError {
  constructor() {
    super(401, "Unauthorized");
  }
}

export class ExamBankError extends HTTPError {
  constructor() {
    super(400, "Exam bank threw an error");
  }
}
