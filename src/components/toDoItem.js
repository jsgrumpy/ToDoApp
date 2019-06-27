import Icon from 'react-native-vector-icons/FontAwesome';

import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


const ToDoItem = (props) => (
  <View style={styles.container}>
    <Icon name={props.item.complete?'check-circle-o':'circle-o'} size={30} onPress={()=>props.checkAsCompletedItem(props.item.key)} color="#900" />
    <Text style={styles.text}>
      {props.item.text}
    </Text>
    <Icon name="trash-o" size={30} onPress={()=>props.removeToDoItem(props.item.key)} color="#900" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});


export default ToDoItem;
