import { LoginFormValues } from '../types';

export const login = (values: LoginFormValues) => {
  const url = '/api/auth/login';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  };

  return fetch(url, options);
};

