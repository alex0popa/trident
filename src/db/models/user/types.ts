export type User = {
  _id?: string,
  name: string,
  lastName: string,
  email: string,
  password: string,
  birthDate: Date,
  matchPassword(param: string): Promise<boolean>
};
