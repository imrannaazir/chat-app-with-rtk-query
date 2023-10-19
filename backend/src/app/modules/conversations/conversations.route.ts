import express from 'express';
import { ConversationsController } from './conversations.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ConversationValidation } from './conversations.validation';
const router = express.Router();

router.get('/', ConversationsController.getConversations);

router.post(
  '/',
  validateRequest(ConversationValidation.createConversationZodSchema),
  ConversationsController.createConversation,
);

// router.patch('/', ConversationsController.editConversation);

export const ConversationsRoutes = router;
