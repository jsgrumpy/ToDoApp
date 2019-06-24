import React from 'react';
import {StyleSheet, View} from 'react-native';
import ListComponent from './src/components/listComponent'

export default function App() {
  return (
    <View style={styles.container}>
      <ListComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
