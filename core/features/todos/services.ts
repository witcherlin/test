import { delay } from '@core/utils';

/* *** */

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
};

const todosKey = 'witcherlin/test/todos';

const todosData: TodoType[] = [
  { id: 1, title: 'Todo 1', completed: true, createdAt: new Date(2024, 0, 1, 12, 30).getTime() },
  { id: 2, title: 'Todo 2', completed: true, createdAt: new Date(2024, 0, 1, 16, 22).getTime() },
  { id: 3, title: 'Todo 3', completed: true, createdAt: new Date(2024, 0, 2, 16, 31).getTime() },
  { id: 4, title: 'Todo 4', completed: true, createdAt: new Date(2024, 0, 5, 11, 30).getTime() },
];

/* *** */

export type GetTodosParams = {
  search?: string;
  sort?: string;
};

export type GetTodosData = TodoType[];

export async function getTodos({ search, sort }: GetTodosParams): Promise<GetTodosData> {
  await delay(100 + Math.random() * 200);

  let todos = todosData;

  try {
    todos = JSON.parse(localStorage.getItem(todosKey) || '') as GetTodosData;
  } catch (err) {}

  if (search) {
    return todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));
  }

  if (sort) {
    return todos.sort((a, b) => (sort === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
  }

  return todos;
}

/* *** */

export type CreateTodoParams = {};

export type CreateTodoPayload = {
  title: string;
  completed: boolean;
};

export type CreateTodoData = TodoType;

export async function createTodo(payload: CreateTodoParams & CreateTodoPayload): Promise<CreateTodoData> {
  const todos = await getTodos({});

  const now = Date.now();
  const todo = { id: now, ...payload, createdAt: now } as TodoType;

  localStorage.setItem(todosKey, JSON.stringify([...todos, todo]));

  return todo;
}

/* *** */

export type UpdateTodoParams = {
  id: number;
};

export type UpdateTodoPayload = {
  title: string;
  completed: boolean;
};

export type UpdateTodoData = TodoType;

export async function updateTodo({ id, ...payload }: UpdateTodoParams & UpdateTodoPayload): Promise<UpdateTodoData> {
  const todos = await getTodos({});

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    throw new Error('Not Found');
  }

  todos[todoIndex] = { ...todos[todoIndex], ...payload };

  localStorage.setItem(todosKey, JSON.stringify(todos));

  return todos[todoIndex];
}

/* *** */

export type DeleteTodoParams = {
  id: number;
};

export type DeleteTodoData = TodoType;

export async function deleteTodo({ id }: DeleteTodoParams): Promise<DeleteTodoData> {
  const todos = await getTodos({});

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    throw new Error('Not Found');
  }

  const todo = todos[todoIndex];

  todos.splice(todoIndex, 1);

  localStorage.setItem(todosKey, JSON.stringify(todos));

  return todo;
}
