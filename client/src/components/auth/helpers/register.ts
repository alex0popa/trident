import { RegisterFormValues } from "../types";

export const register = (values: RegisterFormValues) => {
  const url = '/api/auth/register';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  };

  return fetch(url, options);
};
