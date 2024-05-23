import { ValidationError } from 'express-validator';

import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  logging: boolean;
  statusCode = 400;
  errors: any[];
  constructor(errorIn: ValidationError[]) {
    super('invalid parameters');
    this.errors = errorIn;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      let helper = <string>err.msg.toString();
      return { message: helper, context: err.msg };
    });
  }
}
