import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// get users route
router.get('/', UserController.getUsers);

export const UserRoutes = router;
