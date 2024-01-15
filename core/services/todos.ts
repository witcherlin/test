import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endpoints } from '@core/fixtures/endpoints';
import { fetch } from '@core/utils/fetch';
import {
  GetTodosParams,
  GetTodosData,
  CreateTodoData,
  CreateTodoParams,
  DeleteTodoData,
  DeleteTodoParams,
  UpdateTodoData,
  UpdateTodoParams,
} from '@core/types/todos';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    fetchFn: (input, init) => fetch(input, init, endpoints),
  }),
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    getTodos: build.query<GetTodosData, GetTodosParams>({
      query: (params) => ({
        method: 'GET',
        url: '/todos',
        params,
      }),
      providesTags: ['Todo'],
    }),
    createTodo: build.mutation<CreateTodoData, CreateTodoParams>({
      query: ({ ...body }) => ({
        method: 'POST',
        url: '/todos',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: build.mutation<UpdateTodoData, UpdateTodoParams>({
      query: ({ id, ...body }) => ({
        method: 'PATCH',
        url: `/todos/${id}`,
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: build.mutation<DeleteTodoData, DeleteTodoParams>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/todos/${id}`,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todosApi;
