import { TodoType } from '@core/types/todos';
import { Endpoint } from '@core/utils/fetch';

const todosStorage = {
  todos: [
    { id: 1, title: 'Todo 1', completed: true, createdAt: new Date(2024, 0, 1, 20, 30).getTime() },
    { id: 2, title: 'Todo 2', completed: true, createdAt: new Date(2024, 0, 1, 16, 22).getTime() },
    { id: 3, title: 'Todo 3', completed: true, createdAt: new Date(2024, 0, 2, 16, 31).getTime() },
    { id: 4, title: 'Todo 4', completed: true, createdAt: new Date(2024, 0, 5, 11, 30).getTime() },
  ] as TodoType[],

  get(): TodoType[] {
    try {
      const item = localStorage.getItem('@test/todos');

      if (!item) {
        throw new Error('Not Found');
      }

      return JSON.parse(item);
    } catch (err) {
      return this.todos;
    }
  },
  set(todos: TodoType[]) {
    localStorage.setItem('@test/todos', JSON.stringify(todos));
  },
  add(todos: TodoType[]) {
    this.set([...this.get(), ...todos]);
  },
};

export const endpoints: Endpoint[] = [
  {
    method: 'GET',
    url: '/todos',
    handler: ({ query }) => {
      const todos = todosStorage.get();

      if (query.search) {
        return todos.filter((todo) => todo.title.toLowerCase().includes(query.search.toLowerCase()));
      }

      if (query.sort) {
        return todos.sort((a, b) => (query.sort === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
      }

      return todos;
    },
  },
  {
    method: 'POST',
    url: '/todos',
    handler: ({ body }) => {
      const todo = {
        id: Date.now(),
        ...body,
        createdAt: Date.now(),
      } as TodoType;

      todosStorage.add([todo]);

      return todo;
    },
  },
  {
    method: 'PATCH',
    url: '/todos/:id',
    handler: ({ params, body }) => {
      const todos = todosStorage.get();
      const todoIndex = todos.findIndex((todo) => todo.id === +params.id);

      if (todoIndex < 0) {
        return null;
      }

      todos[todoIndex] = { ...todos[todoIndex], ...body };
      todosStorage.set(todos);

      return todos[todoIndex];
    },
  },
  {
    method: 'DELETE',
    url: '/todos/:id',
    handler: ({ params }) => {
      const todos = todosStorage.get();
      const todoIndex = todos.findIndex((todo) => todo.id === +params.id);

      if (todoIndex < 0) {
        return null;
      }

      const todo = todos[todoIndex];

      todos.splice(todoIndex, 1);
      todosStorage.set(todos);

      return todo;
    },
  },
];
