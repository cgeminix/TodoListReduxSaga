import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useRecoilState } from 'recoil';
import { todoListState, deleteTodoApi, editTodoApi } from '../todoAtoms';

const TodoItem = ({ todo }) => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.name);

  const handleDeleteTodo = async () => {
    const isDeleted = await deleteTodoApi(todo.id);
    if (isDeleted) {
      setTodos((oldTodos) => oldTodos.filter((t) => t.id !== todo.id));
    }
  };

  const handleEditTodo = async () => {
    const updatedTodo = { ...todo, name: editText };
    const editedTodo = await editTodoApi(updatedTodo);
    if (editedTodo) {
      setTodos((oldTodos) =>
        oldTodos.map((t) => (t.id === todo.id ? editedTodo : t))
      );
      setIsEditing(false);
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
          <Button title="Save" onPress={handleEditTodo} />
        </>
      ) : (
        <>
          <Text>{todo.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <Button title="Delete" onPress={handleDeleteTodo} />
          </View>
        </>
      )}
    </View>
  );
};

export default TodoItem;