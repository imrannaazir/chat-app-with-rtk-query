import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MessagesValidation } from './message.validation';
import { MessagesController } from './message.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(MessagesValidation.PostMessageZodSchema),
  MessagesController.postMessage,
);

router.get('/', MessagesController.getMessages);

export const MessagesRoutes = router;
