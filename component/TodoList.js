import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F2F2F2',
  },
  todoContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    margin: 5,
    justifyContent: 'space-between',
  }
});

export default (props) => (
  <ScrollView style={styles.scrollView}>
    {
      props.todos.map((todo, index) => (
        <View key={index} style={styles.todoContainer}>
          <Text>{todo}</Text>

          <TouchableOpacity onPress={() => props.onPressDelete(index)}>
            <Text>DELETE</Text>
          </TouchableOpacity>
        </View>
      ))
    }
  </ScrollView>
);
