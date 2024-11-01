export const addTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo,
});

export const removeTodo = (id) => ({
  type: 'REMOVE_TODO',
  payload: id,
});

export const addTodoAsync = (todo) => ({
  type: 'ADD_TODO_ASYNC',
  payload: todo,
});

export const fetchTodos = () => ({
  type: 'FETCH_TODOS',
});

export const fetchTodosSuccess = (todos) => ({
  type: 'FETCH_TODOS_SUCCESS',
  payload: todos,
});

export const fetchTodosFailure = (error) => ({
  type: 'FETCH_TODOS_FAILURE',
  payload: error,
});

// Action để xóa ToDo từ API
export const removeTodoAsync = (id) => ({
  type: 'REMOVE_TODO_ASYNC',
  payload: id,
});
