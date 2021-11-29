import { Request, Response } from 'express';

import { UserModel as User } from '../../db/models/user';
import { User as TypeUser } from '../../db/models/user/types';

/**
 * Check if a user already has an open session
 */
export const getUser = (req: Request, res: Response) => {
  const { userId } = req;

  const sendResponse = (user: TypeUser | null) => res.json(user);

  User.findById(userId).then(sendResponse);
};
