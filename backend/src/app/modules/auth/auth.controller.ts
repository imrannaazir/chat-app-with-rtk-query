import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import prismaDb from '../../../shared/prismaDb';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import httpStatus from 'http-status';

const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  // check if user already exist
  const existUserWithEmail = await prismaDb.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  // const deleted = await prismaDb.user.deleteMany({ where: {} });

  if (existUserWithEmail) {
    return res
      .status(400)
      .json({ error: 'User already exist with this email!' });
  }
  const result = await AuthService.register(userData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Registered successfully!',
    data: result,
  });
});

export const AuthController = {
  register,
};
