import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://654325f301b5e279de1ff315.mockapi.io/api/v1/TodoApp';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    fetchTodos: builder.query({
      query: () => '',
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: '',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'],
    }),
    editTodo: builder.mutation({
      query: (updatedTodo) => ({
        url: `/${updatedTodo.id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
