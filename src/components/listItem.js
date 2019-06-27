import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const ListItem = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props.item.name}
    </Text>
    <Icon name={!props.item.default?'star-o':'star'} size={30} onPress={()=>props.makeListDefault(props.item.key)} color="#FFE400"/>

    <Icon name="trash-o" onPress={() => props.removeList(props.item.key)} size={30} color="#900"/>
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


export default ListItem;
