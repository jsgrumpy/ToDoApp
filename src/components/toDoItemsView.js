import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TextInput, Button, ScrollView, Text, TouchableOpacity} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist'

import {styles, colors} from '../styles/generalStyles';
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
  renderNonCompletedItem = ({item, index, move, moveEnd, isActive}) => {
    return (
      <TouchableOpacity
        onLongPress={move}
        onPressOut={moveEnd}>
        {!item.complete && <ToDoItem item={item}
                                     checkAsCompletedItem={this.props.checkAsCompletedItem}
                                     removeToDoItem={this.props.removeToDoItem}
                                     editToDoItem={this.props.editToDoItem}/>}
      </TouchableOpacity>
    )
  };

  render() {
    if (this.state.listKey) {
      let dataForFlatList = this.props.toDoLists.find((list) => list.key === this.state.listKey);
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            placeholder="Add new toDo item.."
            onChangeText={(text) => this.setState({inputText: text})}
            onSubmitEditing={() => this.handleAddNewItem(dataForFlatList.key)}
            ref={input => {
              this.textInput = input
            }}
          />
          <ScrollView>
            <View style={styles.listItemsContainer}>
              <DraggableFlatList
                inverted
                scrollPercent={5}
                onMoveEnd={({data}) => this.props.updateListOrder(this.state.listKey, data)}
                extraData={this.props.toDoListChanged}
                data={dataForFlatList.toDoItems}
                renderItem={this.renderNonCompletedItem}
              />
              {this.state.ShowCompleted ? <FlatList
                style={styles.completedContainer}
                extraData={this.props.toDoListChanged}
                data={dataForFlatList.toDoItems}
                renderItem={({item}) => item.complete && <ToDoItem item={item}
                                                                   checkAsCompletedItem={this.props.checkAsCompletedItem}
                                                                   removeToDoItem={this.props.removeToDoItem}/>}
              /> : null
              }
            </View>
            <Button color={colors.buttons}
                    title={!this.state.ShowCompleted ? 'Show completed items' : 'Hide Completed items'}
                    onPress={this.handleShowCompletedPress}/>
          </ScrollView>
        </View>
      );
    } else {
      return (<Text>Сhoose list to show</Text>)
    }
  }
}

export default ToDoItemsView;
