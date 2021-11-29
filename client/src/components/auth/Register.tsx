import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FORM_STYLE } from '../utils/styles';
import { RegisterFormValues } from './types';
import { pattern, required } from './constants';
import { Container, FormError } from '../utils/customElements';
import { LinkToLogin } from '../utils/links';
import { register as registerUser } from './helpers/register';

export const Register = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    register,
    reset
  } = useForm<RegisterFormValues>();

  const validate = {
    passwordConfirmation: (value: string) => (
      getValues('password') === value || "Passwords should match!"
    )
  };

  const onSubmit = (values: RegisterFormValues) => {
    registerUser(values).then(() =>  navigate('/home'));
    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}  style={FORM_STYLE}>
        <h3 style={{ marginTop: 0 }}>
          Register
        </h3>
        <input
          placeholder="name"
          {...register('name', { required })}
          type="text"
        />
        <FormError error={errors.name?.message} />
        <input
          placeholder="lastName"
          {...register('lastName', { required })}
          type="text"
        />
        <FormError error={errors.lastName?.message} />
        <input
          placeholder="email"
          type="email"
          {...register('email', { required, pattern })}
        />
        <FormError error={errors.email?.message} />
        <input
          placeholder="birthDate"
          {...register('birthDate', { required })}
          type="date"
        />
        <FormError error={errors.birthDate?.message} />
        <input
          placeholder="password"
          {...register('password', { required })}
          type="password"
        />
        <FormError error={errors.password?.message} />
        <input
          placeholder="confirm assword"
          {...register('passwordVerify', { required, validate })}
          type="password"
        />
        <FormError error={errors.passwordVerify?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit">
            Register
          </button>
          <LinkToLogin />
        </div>
      </form>
    </Container>
  );
};
