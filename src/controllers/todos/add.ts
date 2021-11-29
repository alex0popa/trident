import { Request, Response } from 'express';

import { TodoModel as Todo } from '../../db/models/todo';
import { Body } from './types';

export const addTodo = (req: Request, res: Response) => {
  const { name, expiration } = req.body as Body;
  let status = 400;

  // validation
  if (!name || !expiration) {
    const msg = 'Please enter all required fields!';

    return res.status(status).json({ msg });
  }

  Todo.create({ name, expiration }).then(todo => res.json(todo));
};
