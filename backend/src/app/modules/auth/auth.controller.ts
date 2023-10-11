import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const register = catchAsync(async (req: Request, res: Response) => {
  console.log('yep!');
});

export const AuthController = {
  register,
};
