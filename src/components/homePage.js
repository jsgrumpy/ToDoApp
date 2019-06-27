import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {ToDoItemsView} from '../containers'


class HomePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ToDoItemsView/>
      </View>)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomePage;
