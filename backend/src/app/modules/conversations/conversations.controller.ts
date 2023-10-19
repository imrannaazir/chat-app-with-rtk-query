import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ConversationService } from './conversations.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IConversationQueryData } from './conversations.interface';

const getConversations = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as IConversationQueryData;

  const result = await ConversationService.getConversation(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversation retrieved successfully.',
    data: result,
  });
});

const createConversation = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await ConversationService.createConversation(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversation created successfully!',
    data: result,
  });
});

// const editConversation = catchAsync(async (req: Request, res: Response) => {});

export const ConversationsController = {
  getConversations,
  createConversation,
  // editConversation,
};
