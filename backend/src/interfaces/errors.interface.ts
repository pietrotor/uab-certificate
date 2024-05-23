interface BadRequestErrorParams {
  code?: number;
  message?: string;
  logging?: boolean;
  context?: { [key: string]: any };
}

export { BadRequestErrorParams };
