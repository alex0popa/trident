import { Router } from 'express';

import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import { register } from '../controllers/auth/register';

export const authenticationRouter = Router();

authenticationRouter.route('/register').post(register);

authenticationRouter.route('/login').post(login);

authenticationRouter.route('/logout').get(logout);

// authenticationRouter.route('/forgotPassword').post()

// authenticationRouter.route('resetPassword/:resetToken').put()