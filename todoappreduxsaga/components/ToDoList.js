import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeTodoAsync, editTodoAsync } from '../todoActions';

const TodoList = () => {
  const { todos, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(null); // ID của ToDo đang chỉnh sửa
  const [editText, setEditText] = useState(''); // Nội dung chỉnh sửa

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleRemoveTodo = (id) => {
    dispatch(removeTodoAsync(id));
  };

  const handleEditTodo = (todo) => {
    setIsEditing(todo.id);
    setEditText(todo.title);
  };

  const handleSaveEdit = (id) => {
    const updatedTodo = { id, name: editText, completed: false };
    dispatch(editTodoAsync(updatedTodo)); // Gửi yêu cầu chỉnh sửa
    setIsEditing(null); // Đặt lại trạng thái
    setEditText(''); // Xóa nội dung chỉnh sửa
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
          <View style={{ flexDirection: 'row'}}>
            <Button title="Edit" onPress={() => handleEditTodo(item)} />
            <Button title="Delete" onPress={() => handleRemoveTodo(item.id)} />
          </View>
        </>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TodoList;
