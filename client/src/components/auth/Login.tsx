import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FORM_STYLE } from '../utils/styles';
import { LoginFormValues } from './types';
import { pattern, required } from './constants';
import { Container, FormError } from '../utils/customElements';
import { LinkToRegister } from '../utils/links';
import { login } from './helpers/login';

export const Login = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<LoginFormValues>();

  const onSubmit = (values: LoginFormValues) => {
    login(values).then(() =>  navigate('/home'));
    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLE}>
        <h3 style={{ marginTop: 0 }}>
          Login
        </h3>
        <input
          placeholder="email"
          type="email"
          {...register('email', { required, pattern })}
        />
        <FormError error={errors.email?.message} />
        <input
          placeholder="password"
          {...register('password', { required })}
          type="password"
          />
        <FormError error={errors.password?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type='submit'>
            Login
          </button>
          <LinkToRegister />
        </div>
      </form>
    </Container>
  );
};
