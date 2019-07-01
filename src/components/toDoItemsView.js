import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TextInput, Button, ScrollView, Text} from 'react-native';

import ToDoItem from './toDoItem';


class ToDoItemsView extends Component {

  state = {
    listKey: this.props.selectedListKey ? this.props.selectedListKey : this.props.defaultListKey,
    ShowCompleted: false,
    inputText: '',
    extraData: false,

  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.selectedListKey !== nextProps.selectedListKey || this.props.defaultListKey !== nextProps.defaultListKey) {
      this.setState({
        listKey: nextProps.selectedListKey ? nextProps.selectedListKey : nextProps.defaultListKey
      })
    }
  }

  generateKey = () => {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  };


  handleAddNewItem = (listKey) => {
    let newToDoItem = {key: this.generateKey(), text: this.state.inputText, complete: false};
    this.props.addNewToDoItem(listKey, newToDoItem);
    this.setState({
      inputText: ''
    });
    this.textInput.clear();
  };

  handleShowCompletedPress = () => {
    this.setState({ShowCompleted: !this.state.ShowCompleted})
  };


  render() {
    if (this.state.listKey) {
      let dataForFlatList = this.props.toDoLists.find((list) => list.key === this.state.listKey);
      return (
        <View style={styles.container}>
          <TextInput
            style={{height: 40}}
            placeholder="Add new toDo item.."
            onChangeText={(text) => this.setState({inputText: text})}
            onSubmitEditing={() => this.handleAddNewItem(dataForFlatList.key)}
            ref={input => {
              this.textInput = input
            }}
          />
          <ScrollView>
            <FlatList
              extraData={this.props.toDoListChanged}
              data={dataForFlatList.toDoItems}
              renderItem={({item}) => !item.complete && <ToDoItem item={item}
                                                                  checkAsCompletedItem={this.props.checkAsCompletedItem}
                                                                  removeToDoItem={this.props.removeToDoItem}
              />}
            />
            {this.state.ShowCompleted ? <FlatList
              extraData={this.props.toDoListChanged}
              data={dataForFlatList.toDoItems}
              renderItem={({item}) => item.complete && <ToDoItem item={item}
                                                                 checkAsCompletedItem={this.props.checkAsCompletedItem}
                                                                 removeToDoItem={this.props.removeToDoItem}
              />}
            /> : null
            }
            <Button title={!this.state.ShowCompleted ? 'Show completed items' : 'Hide Completed items'}
                    onPress={this.handleShowCompletedPress}/>
          </ScrollView>
        </View>
      );
    } else {
      return (<Text>Сhoose list to show</Text>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    backgroundColor: '#8E8E8E',
  },
});

export default ToDoItemsView;
