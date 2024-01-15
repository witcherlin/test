import { FormEvent, useState } from 'react';

import { TextInput, CheckBoxInput, SelectInput, Button } from '@core/components';
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '@core/services/todos';
import { TodoType } from '@core/types/todos';

import styles from './App.module.scss';

/* *** */

function chunk<T>(arr: T[], size: number): T[] {
  console.log(arr, size);
  return [];
}

console.log(chunk([1, 2, 3, 4, 5], 1)); // [[1], [2], [3], [4], [5]]
console.log(chunk([1, 2, 3, 4, 5], 3)); // [[1, 2, 3], [4, 5]]

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
            <Button onClick={handleUpdate}>update</Button>
            <Button variant="danger" onClick={handleDelete}>
              delete ?{/* cancel (10) */}
            </Button>
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

  const { todos } = useGetTodosQuery(
    {
      search,
      sort,
    },
    {
      selectFromResult: ({ data }) => ({
        todos: data || [],
      }),
    },
  );

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <h1 className={styles.header__title__heading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
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
              // TODO: Fix
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
          // TODO: Fix
          onCreate={createTodo}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
