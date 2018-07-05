/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import TodoList from './component/TodoList.js';

type Props = {};
export default class App extends Component<Props> {
  state = {
    newTodo: '',
    todos: [],
  }

  constructor(props) {
    super(props);
    this.loadTodos();
  }

  onChangeText(newTodo) {
    this.setState({ newTodo: newTodo });
  }

  onPressAdd() {
    const { todos, newTodo } = this.state;
    this.setState({
      newTodo: '',
      todos: [newTodo, ...todos],
    });
  }

  onPressDelete(index) {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter((t, i) => i !== index)
    }, () => this.storeTodos());
  }

  storeTodos() {
    const str = JSON.stringify(this.state.todos);
    AsyncStorage.setItem('todos', str);
  }

  loadTodos() {
    AsyncStorage.getItem('todos').then((str) => {
      const todos = str ? JSON.parse(str) : [];
      this.setState({ todos });
    }).then(() => {
      this.storeTodos();
    });
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.newTodo}
          style={styles.form}
          onChangeText={ text => this.onChangeText(text) }
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.onPressAdd()}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>

        <TodoList todos={this.state.todos} onPressDelete={(index) => this.onPressDelete(index)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  form: {
    padding: 10,
    backgroundColor: '#EEE',
  },
  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 4,
    marginTop: 15,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
