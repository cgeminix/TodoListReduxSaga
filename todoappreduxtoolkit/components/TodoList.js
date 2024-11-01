import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useFetchTodosQuery, useAddTodoMutation, useEditTodoMutation, useDeleteTodoMutation } from './TodoSlice';

const TodoList = () => {
  const { data: todos = [], isLoading, error } = useFetchTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isEditing, setIsEditing] = useState(null); // ID của ToDo đang chỉnh sửa
  const [editText, setEditText] = useState(''); // Nội dung chỉnh sửa
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = async () => {
    if (newTodoText.trim()) {
      await addTodo({ name: newTodoText, completed: false });
      setNewTodoText('');
    }
  };

  const handleEditTodo = (todo) => {
    setIsEditing(todo.id);
    setEditText(todo.name);
  };

  const handleSaveEdit = async (id) => {
    if (editText.trim()) {
      await editTodo({ id, name: editText, completed: false });
      setIsEditing(null);
      setEditText('');
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      }}
    >
      {isEditing === item.id ? (
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
          <Button title="Save" onPress={() => handleSaveEdit(item.id)} />
        </>
      ) : (
        <>
          <Text>{item.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Edit" onPress={() => handleEditTodo(item)} />
            <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
          </View>
        </>
      )}
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

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
          height:40,
          marginTop:20
        }}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;
