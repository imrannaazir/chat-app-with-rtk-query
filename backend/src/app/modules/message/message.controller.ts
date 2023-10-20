import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { MessageService } from './message.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const PostMessage = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await MessageService.PostMessage(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message successfully Posted!',
    data: result,
  });
});

export const MessagesController = {
  PostMessage,
};
