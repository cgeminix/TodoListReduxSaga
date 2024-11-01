import { put, takeEvery, call, delay } from 'redux-saga/effects';
import {
  addTodo,
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosFailure,
  removeTodo,
} from './todoActions';

const API_URL = 'https://654325f301b5e279de1ff315.mockapi.io/api/v1/TodoApp';

// Hàm gọi API để lấy danh sách ToDo
function fetchTodosApi() {
  return fetch(API_URL).then((response) => response.json());
}

// Hàm gọi API để thêm ToDo mới
function addTodoApi(todo) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  }).then((response) => response.json());
}

// Hàm gọi API để xóa ToDo
function removeTodoApi(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  });
}

// Saga lấy danh sách ToDo từ API
function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Saga thêm ToDo mới
function* addTodoAsyncSaga(action) {
  try {
    const newTodo = yield call(addTodoApi, action.payload);
    yield put(addTodo(newTodo));
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

// Saga xóa ToDo từ API và tải lại danh sách
function* removeTodoAsyncSaga(action) {
  try {
    yield call(removeTodoApi, action.payload);
    yield put(fetchTodos()); // Gọi lại fetchTodos để tải danh sách mới nhất
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

// Watcher Saga
export default function* watchTodoSaga() {
  yield takeEvery('FETCH_TODOS', fetchTodosSaga);
  yield takeEvery('ADD_TODO_ASYNC', addTodoAsyncSaga);
  yield takeEvery('REMOVE_TODO_ASYNC', removeTodoAsyncSaga);
}
