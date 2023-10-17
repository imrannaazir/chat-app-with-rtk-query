import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const users = await UserService.getUsers(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retrieved Successfully!',
    data: users,
  });
});

export const UserController = {
  getUsers,
};
