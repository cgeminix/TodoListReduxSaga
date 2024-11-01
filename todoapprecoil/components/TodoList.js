import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState, fetchTodosSelector, addTodoApi } from '../todoAtoms';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const fetchedTodos = useRecoilValue(fetchTodosSelector);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    setTodos(fetchedTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedTodos]);

  const handleAddTodo = async () => {
    const newTodo = { name: newTodoText, completed: false };
    const addedTodo = await addTodoApi(newTodo);
    if (addedTodo) {
      setTodos((oldTodos) => [...oldTodos, addedTodo]);
      setNewTodoText('');
    }
  };

  if (!todos) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View>
      <TextInput
        value={newTodoText}
        onChangeText={setNewTodoText}
        placeholder="Add a new todo"
        style={{ 
          borderWidth: 1, 
          borderColor: 'gray', 
          paddingHorizontal: 8, 
          marginBottom: 10 , 
          marginTop:10, 
          height: 40}}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;