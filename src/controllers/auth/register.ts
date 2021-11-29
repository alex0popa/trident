import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { UserModel as User } from '../../db/models/user';
import { User as TypeUser } from '../../db/models/user/types';
import { Body } from './types';
  
export const register = async (req: Request, res: Response) => {
  let status = 400;
  const {
    name,
    lastName,
    email,
    birthDate,
    password,
    passwordVerify
  } = req.body as Body;

  // validation
  if (!name
    || !lastName
    || !email
    || !password
    || !passwordVerify
    || !birthDate
  ) {
    const msg = 'Please enter all required fields!';

    return res.status(status).json({ msg });
  }

  if (password.length < 6) {
    const msg = 'Please enter a password of at least 6 characters!';

    return res.status(status).json({ msg });
  }

  if (password !== passwordVerify) {
    const msg = 'Please enter the same password twice!';

    return res.status(status).json({ msg });
  }


  if (await User.findOne({ email })) {
    const msg = 'An acount with this email already exists!';

    return res.status(status).json({ msg });
  }

  // save a new user acount to db
  User
    .create({ name, lastName, email, password, birthDate })
    .then(({ _id: id, name }: TypeUser) => {
      const token = jwt.sign({ id }, process.env.JWT_SECRET as string);

      res
        .cookie('secret', token, { httpOnly: true })
        .send();
    })
    .catch(error => {
      status = 500;
      console.error(error);

      /**
       * No error sent, to prevent hackers from knowing what kind of error they
       * are encountering!
       */
      res.status(status).send();
    });
};
