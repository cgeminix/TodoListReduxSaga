import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeTodoAsync } from '../todoActions';

const TodoList = () => {
  const { todos, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos()); // Gọi API lấy ToDo khi component mount
  }, [dispatch]);

  const handleRemoveTodo = (id) => {
    dispatch(removeTodoAsync(id)); // Xoá ToDo qua API và tải lại danh sách
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
      <Text>{item.name}</Text>
      <Button title="Delete" onPress={() => handleRemoveTodo(item.id)} />
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
