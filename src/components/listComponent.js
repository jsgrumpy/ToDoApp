import React from 'react';
import ToDoItem from './toDoItem';
import {View, FlatList, StyleSheet, TextInput, Button, ScrollView} from 'react-native';

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

class ListComponent extends React.Component {

  state = {
    toDoItems: [
      {key: 'f5d47a64', text: 'todo item #1', complete: false},
      {key: 'f1w47a61', text: 'todo item #2', complete: false},
      {key: 'f5d4uj84', text: 'todo item #3', complete: false},
      {key: 'f5lw7a64', text: 'todo item #4', complete: true},

    ],
    ShowCompleted: false,
    inputText: '',
    extraData: false,

  };

  generateKey = () => {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  };
  handleCheckItem = (key) => {
    console.log('key', key);
    let newList = this.state.toDoItems;
    newList.forEach((item) => {
      if (item.key === key) {
        item.complete = !item.complete;
      }
    });
    this.setState({
      toDoItems: newList
    })
  };

  handleAddNewItem = () => {
    let nemList = this.state.toDoItems;
    let newToDoItem = {key: this.generateKey(), text: this.state.inputText, complete: false}
    nemList.push(newToDoItem);
    this.setState({
      toDoItems: nemList,
      inputText: '',
    });
    this.setState({
      inputText: '',
    });
    this.textInput.clear();
  };

  handleShowCompletedPress = () => {
    this.setState({ShowCompleted: !this.state.ShowCompleted})
  };

  handleRemoveItem = (key) => {
    let newLIst = this.state.toDoItems.filter((item) => item.key !== key)
    this.setState({toDoItems: newLIst})
  };


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Add new.."
          onChangeText={(text) => this.setState({inputText: text})}
          onSubmitEditing={() => this.handleAddNewItem()}
          ref={input => {
            this.textInput = input
          }}
        />
        <ScrollView>
          <FlatList
            extraData={this.state}
            data={this.state.toDoItems}
            renderItem={({item}) => !item.complete && <ToDoItem item={item}
                                                                handleCheckItem={this.handleCheckItem}
                                                                handleRemoveItem={this.handleRemoveItem}
            />}
          />
          {this.state.ShowCompleted ? <FlatList
            extraData={this.state}
            data={this.state.toDoItems}
            renderItem={({item}) => item.complete && <ToDoItem item={item}
                                                               handleCheckItem={this.handleCheckItem}
                                                               handleRemoveItem={this.handleRemoveItem}
            />}
          /> : null
          }
          <Button title={'Show completed items'} onPress={this.handleShowCompletedPress}/>
        </ScrollView>

      </View>
    );
  }

}

export default ListComponent;