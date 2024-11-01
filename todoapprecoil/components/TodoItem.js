import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useRecoilState } from 'recoil';
import { todoListState } from '../todoAtoms';

const TodoItem = ({ todo }) => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.name);

  const updateTodo = async () => {
    const updatedTodo = { ...todo, name: editText };
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    if (response.ok) {
      setTodos((oldTodos) =>
        oldTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      setIsEditing(false);
    }
  };

  const deleteTodo = async () => {
    const response = await fetch(`${API_URL}/${todo.id}`, { method: 'DELETE' });
    if (response.ok) {
      setTodos((oldTodos) => oldTodos.filter((t) => t.id !== todo.id));
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      }}
    >
      {isEditing ? (
        <>
          <TextInput
            value={editText}
            onChangeText={setEditText}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              flex: 1,
              marginRight: 10,
              paddingHorizontal: 8,
            }}
          />
          <Button title="Save" onPress={updateTodo} />
        </>
      ) : (
        <>
          <Text>{todo.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <Button title="Delete" onPress={deleteTodo} />
          </View>
        </>
      )}
    </View>
  );
};

export default TodoItem;