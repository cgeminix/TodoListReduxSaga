import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState, fetchTodosSelector } from '../todoAtoms';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const fetchedTodos = useRecoilValue(fetchTodosSelector);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    setTodos(fetchedTodos);
  }, [fetchedTodos]);

  const addTodo = async () => {
    const newTodo = { name: newTodoText, completed: false };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      const addedTodo = await response.json();
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
          marginBottom: 10,
          marginTop: 10,
          height: 40
        }}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;