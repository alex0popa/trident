import { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { FORM_STYLE } from '../utils/styles';
import { required } from '../auth/constants';
import { INITIAL_TODOS_LIST } from './constants';
import { Todo } from './types';
import { Container, FormError } from '../utils/customElements';
import { LinkToHome } from '../utils/links';

export const Todos = () => {
  const [todos, setTodos] = useState(INITIAL_TODOS_LIST);

  // get all todos from db
  useEffect(() => {
    fetch('/api/todos/get-all-todos')
      .then(resp => resp.json())
      .then(todos => setTodos(pr => [...pr, ...todos]))
  }, []);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<Todo>();

  const onSubmit: SubmitHandler<Todo> = fields => {
    // add the todo on db and update the list for user
    fetch('/api/todos/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(resp => resp.json())
    .then((todo: Todo) => {
      setTodos(pr => [...pr, todo])
      reset();
    });
  };

  /**
   * The to-do list to show to the user
   */
  const todosList = todos.map(({ _id, name, expiration}) =>
    <p key={_id}>{`${name} - ${expiration}`}</p>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)'
    }}>
      <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLE}>
        <h3 style={{ marginTop: 0, justifySelf: 'center' }}>
          Weather
        </h3>
        <input
          placeholder="Todo name"
          type="name"
          {...register('name', { required })}
        />
        <FormError error={errors.name?.message} />
        <input
          placeholder="Expiration"
          {...register('expiration', { required })}
          type="datetime-local"
        />
        <FormError error={errors.expiration?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type='submit'>Add</button>
          <LinkToHome />
        </div>
      </form>
      </Container>
      {<Container>
        <div style={{ ...FORM_STYLE, padding: '4rem'}}>
          <h3>Todos</h3>
          {todosList}
        </div>
      </Container>}
    </div>
  );
};
