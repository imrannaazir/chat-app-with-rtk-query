import { NextFunction, Request, RequestHandler, Response } from 'express';
import { error } from 'winston';

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch {
      next(error);
    }
  };
};

export default catchAsync;
