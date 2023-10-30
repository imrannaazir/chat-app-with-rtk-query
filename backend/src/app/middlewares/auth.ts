import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import { JWtHelpers } from '../../helpers/jwtHelper';
import config from '../../config';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    let verifiedUser = null;

    verifiedUser = JWtHelpers.verifiedToken(token, config.jwt.secret as Secret);

    req.user = verifiedUser;

    if (!verifiedUser.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
