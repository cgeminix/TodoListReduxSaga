import { atom, selector } from 'recoil';

const API_URL = 'https://654325f301b5e279de1ff315.mockapi.io/api/v1/TodoApp';

// Atom lưu danh sách ToDo
export const todoListState = atom({
  key: 'todoListState',
  default: selector({
    key: 'todoListState/default',
    get: async () => {
      const response = await fetch(API_URL);
      return response.ok ? await response.json() : [];
    },
  }),
});

// Selector để lấy danh sách ToDo từ API
export const fetchTodosSelector = selector({
  key: 'fetchTodosSelector',
  get: async ({ get }) => {
    const response = await fetch(API_URL);
    return response.ok ? await response.json() : get(todoListState);
  },
});

// Hàm API để thêm ToDo
export const addTodoApi = async (todo) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.ok ? await response.json() : null;
};

// Hàm API để xóa ToDo
export const deleteTodoApi = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return response.ok;
};

// Hàm API để chỉnh sửa ToDo
export const editTodoApi = async (todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.ok ? await response.json() : null;
};

