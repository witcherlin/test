import { keepPreviousData, useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { GetTodosParams, getTodos, createTodo, updateTodo, deleteTodo } from './services';

/* *** */

export function useGetTodosQuery(params: GetTodosParams) {
  const queryResult = useQuery({
    queryKey: ['todos', params] as const,
    queryFn: () => getTodos(params),
    placeholderData: keepPreviousData,
  });

  // TODO: Seems fixed in latest version of react-query
  // Trigger getter for correct work placeholderData
  if (queryResult.dataUpdatedAt) {
    // skip
  }

  return queryResult;
}

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.refetchQueries({
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
      queryClient.refetchQueries({
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
      queryClient.refetchQueries({
        queryKey: ['todos'],
      });
    },
  });
}
