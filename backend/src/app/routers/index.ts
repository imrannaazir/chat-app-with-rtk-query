import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ConversationsRoutes } from '../modules/conversations/conversations.route';
import { MessagesRoutes } from '../modules/message/message.route';

const router = express.Router();

const moduleRouters = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/conversations',
    route: ConversationsRoutes,
  },
  {
    path: '/messages',
    route: MessagesRoutes,
  },
];

moduleRouters.forEach(route => router.use(route.path, route.route));

export default router;
