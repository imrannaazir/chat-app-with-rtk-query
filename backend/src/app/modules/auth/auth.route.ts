import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.register,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login,
);

export const AuthRoutes = router;
