import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MessagesValidation } from './message.validation';
import { MessagesController } from './message.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(MessagesValidation.PostMessageZodSchema),
  MessagesController.PostMessage,
);

export const MessagesRoutes = router;
