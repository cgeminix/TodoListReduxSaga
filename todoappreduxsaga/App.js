import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import store from './store';
import AddTodo from './components/AddTodo';
import TodoList from './components/ToDoList';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.header}>ToDo App</Text>
        <AddTodo />
        <TodoList />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;