import { Request, Response } from 'express';

import { TodoModel as Todo } from '../../db/models/todo';

export const getAllTodos = (req: Request, res: Response) => {
  Todo.find().then(todos => res.json(todos));
};
