export type LoginFormValues = {
  email: string,
  password: string
};

export type RegisterFormValues = LoginFormValues & {
  name: string,
  lastName: string,
  birthDate: Date,
  passwordVerify: string
};
