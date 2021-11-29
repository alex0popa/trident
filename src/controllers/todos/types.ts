import { Todo } from "../../db/models/todo/types";

export type Body = Pick<Todo, 'name' | 'expiration'>;
