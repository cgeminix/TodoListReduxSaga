import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoList from './components/TodoList';

const App = () => (
  <RecoilRoot>
    <TodoList />
  </RecoilRoot>
);

export default App;