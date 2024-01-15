import { FormEvent, useState } from 'react';

import logoImage from '@core/assets/logo.png';
import { TextInput, CheckBoxInput, SelectInput, Button } from '@core/components';
import { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '@core/services';
import { TodoType } from '@core/types';
import { delay } from '@core/utils';

import styles from './App.module.scss';

/* *** */

function chunk<T>(arr: T[], size: number): T[][] {
  return [];
}

console.log(chunk([1, 2, 3, 4, 5, 6], 1)); // [[1], [2], [3], [4], [5], [6]]
console.log(chunk([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]
console.log(chunk([1, 2, 3, 4, 5, 6], 3)); // [[1, 2, 3], [4, 5, 6]]
console.log(chunk([1, 2, 3, 4, 5, 6], 4)); // [[1, 2, 3, 4], [5, 6]]

function limit<T, U extends unknown[]>(fn: (...args: U) => T, time: number) {
  return (...args: U) => {
    return fn(...args);
  };
}

limit(delay, 100)(10).then(console.log).catch(console.error); // Done
limit(delay, 100)(50).then(console.log).catch(console.error); // Done
limit(delay, 100)(150).then(console.log).catch(console.error); // Error: Time Limit Exceeded
limit(delay, 100)(300).then(console.log).catch(console.error); // Error: Time Limit Exceeded

/* *** */

type TodoFormProps = {
  mode: 'new' | 'edit';
  todo?: TodoType;
  onCreate: (todo: Pick<TodoType, 'title' | 'completed'>) => void;
  onUpdate: (todo: TodoType) => void;
  onDelete: (todo: TodoType) => void;
};

function TodoForm({ mode, todo, onCreate, onUpdate, onDelete }: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title || '');
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCreate({
      title,
      completed,
    });
  };

  const handleUpdate = () => (todo ? onUpdate(todo) : undefined);

  const handleDelete = () => (todo ? onDelete(todo) : undefined);

  return (
    <form className={styles.todoForm} onSubmit={handleCreate}>
      <TextInput placeholder="Title" value={title} onChange={setTitle} />
      <CheckBoxInput value={completed} onChange={setCompleted} />

      <div className={styles.todoForm__actions}>
        {mode === 'new' && <Button type="submit">create</Button>}

        {mode === 'edit' && (
          <>
            <Button onClick={handleUpdate}>save</Button>
            <Button variant="danger" onClick={handleDelete}>delete ?! {/* cancel (9) */}</Button>
          </>
        )}
      </div>
    </form>
  );
}

/* *** */

export function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');

  const { todos } = useGetTodosQuery({ search, sort }, {
    selectFromResult: ({ data }) => ({
      todos: data || [],
    }),
  });

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.header__content}>
          <div className={styles.header__content__left}>
            <img className={styles.header__content__logo} src={logoImage} alt="" />
            <span className={styles.header__content__heading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </div>
          <SelectInput options={['asc', 'desc']} value={sort} onChange={setSort} />
        </div>

        <TextInput placeholder="Search" value={search} onChange={setSearch} />
      </div>

      <div className={styles.content}>
        {todos.map((todo) => (
          <div key={todo.id} className={styles.content__item}>
            <TodoForm
              mode="edit"
              todo={todo}
              onCreate={() => {}}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <TodoForm
          mode="new"
          onCreate={createTodo}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
