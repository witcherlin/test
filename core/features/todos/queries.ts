import { keepPreviousData, useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { GetTodosParams, getTodos, createTodo, updateTodo, deleteTodo } from './services';

/* *** */

export function useGetTodosQuery(params: GetTodosParams) {
  const queryResult = useQuery({
    queryKey: ['todos', params] as const,
    queryFn: () => getTodos(params),
    placeholderData: keepPreviousData,
  });

  if (queryResult.isPlaceholderData) {
    // trigger getter for correct work placeholderData
  }

  return queryResult;
}

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}
