import { Router } from 'express';

import { addTodo } from '../controllers/todos/add';
import { getAllTodos } from '../controllers/todos/getAll';

export const todosRouter = Router();

todosRouter.route('/add-todo').post(addTodo);

todosRouter.route('/get-all-todos').get(getAllTodos)