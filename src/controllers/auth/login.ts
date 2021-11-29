import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { UserModel as User } from '../../db/models/user';
import { User as TypeUser } from '../../db/models/user/types';
import { Body } from './types';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body as Pick<Body, 'email' | 'password'>;
  let status = 400;

  // validate
  if (!email || !password) {
    const msg = 'Please enter all required fields!';

    return res.status(status).json({ msg });
  }

  status = 404;
  const msg = 'Invalid credentials!';

  User
    .findOne({ email })
    .select('+password')
    .then((user: TypeUser | null) => {
      !user && res.status(status).json({ msg });

      user?.matchPassword(password)
        .then(isMatch => {
          if (isMatch) {
            const id = user._id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET as string);

            res
              .cookie('secret', token, { httpOnly: true })
              .send();
          } else {
            res.status(status).json({ msg })
          }
        })
        .catch(() => {
          status = 500;

          res.status(status).send()
        });
    })
    .catch(error => {
      status = 500;
      console.error(error);

      res.status(status).send();
    });
};
