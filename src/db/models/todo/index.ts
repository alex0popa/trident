import { model, Schema } from 'mongoose';

import { Todo } from './types';

const TodoSchema = new Schema<Todo>({
  name: {
    type: String,
    required: [true, 'Please provide a name...']
  },
  expiration: {
    type: Date,
    required: [true, 'Please provide expiration date...']
  }
});

export const TodoModel = model('Todo', TodoSchema);
