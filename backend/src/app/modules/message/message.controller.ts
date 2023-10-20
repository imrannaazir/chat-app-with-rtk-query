import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { MessageService } from './message.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IMessagesQueryData } from './message.interface';

const postMessage = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await MessageService.postMessage(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message successfully Posted!',
    data: result,
  });
});

const getMessages = catchAsync(async (req: Request, res: Response) => {
  const queryData = req.query;
  const result = await MessageService.getMessages(
    queryData as IMessagesQueryData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Retrieved messages!',
    data: result,
  });
});

export const MessagesController = {
  postMessage,
  getMessages,
};
