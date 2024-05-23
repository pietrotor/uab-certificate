import { BadRequestErrorParams } from '../interfaces';
import { CustomError } from './CustomError';

export default class BadRequestError extends CustomError {
  private static readonly DEFAULT_STATUS_CODE = 400;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: BadRequestErrorParams) {
    const { code = BadRequestError.DEFAULT_STATUS_CODE, message = 'Bad request', logging = false, context = {} } = params || {};

    super(message);
    this._code = code;
    this._logging = logging;
    this._context = context;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
