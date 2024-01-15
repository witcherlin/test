export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
};

export type GetTodosParams = {
  search?: string;
  sort?: string;
};

export type GetTodosData = TodoType[];

export type CreateTodoParams = {
  title: string;
  completed: boolean;
};

export type CreateTodoData = TodoType;

export type UpdateTodoParams = {
  id: number;
  title: string;
  completed: boolean;
};

export type UpdateTodoData = TodoType;

export type DeleteTodoParams = {
  id: number;
};

export type DeleteTodoData = TodoType;
