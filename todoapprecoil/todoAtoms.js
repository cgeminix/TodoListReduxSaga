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