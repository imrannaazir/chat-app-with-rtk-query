import express from 'express';
import { ConversationsController } from './conversations.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ConversationValidation } from './conversations.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/', auth, ConversationsController.getConversations);

router.post(
  '/',
  validateRequest(ConversationValidation.createConversationZodSchema),
  ConversationsController.createConversation,
);

router.patch('/:id', ConversationsController.editConversation);

export const ConversationsRoutes = router;
