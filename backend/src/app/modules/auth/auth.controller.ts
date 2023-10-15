import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import prismaDb from '../../../shared/prismaDb';

const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  // check if user already exist
  const existUserWithEmail = await prismaDb.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existUserWithEmail) {
    return res
      .status(400)
      .json({ error: 'User already exist with this email!' });
  }
  const result = await AuthService.register(userData);
});

export const AuthController = {
  register,
};
