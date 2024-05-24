import { CustomError, CustomErrorContent } from './CustomError';
export class NotAuthorizedError extends CustomError {
  errors: CustomErrorContent[];
  logging: boolean;
  statusCode = 401;

  constructor() {
    super('No autorizado');
    // only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: 'No autorizado' }];
  }
}
