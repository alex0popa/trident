import { User } from "../../db/models/user/types";

export type Body = Pick<
  User,
  | 'name'
  | 'lastName'
  | 'email'
  | 'password'
  | 'birthDate'
> & {
  passwordVerify: string
};