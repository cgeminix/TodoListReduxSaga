import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../todoActions';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now().toString(), // Đảm bảo mỗi mục có ID duy nhất
        name: text,
        completed: false, // Thiết lập trạng thái ban đầu cho ToDo
      };
      dispatch(addTodoAsync(newTodo));
      setText('');
    }
  };

  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter ToDo"
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          flex: 1,
          marginRight: 10,
          paddingHorizontal: 8,
        }}
      />
      <Button title="Add" onPress={handleAddTodo} />
    </View>
  );
};

export default AddTodo;
