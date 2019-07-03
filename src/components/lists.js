import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TextInput, Button, ScrollView} from 'react-native';

import {styles, colors} from '../styles/generalStyles';

import ListItem from './listItem'

class Lists extends Component {
  state = {
    showInput: false,
    inputText: '',
    extraData: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.showInput) {
      this.textInput.focus();

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            style={styles.listItemsContainer}
            extraData={this.props.listsChanged}
            data={this.props.toDoLists}
            renderItem={({item}) => <ListItem removeList={this.props.removeList}
                                              selectList={this.props.selectList}
                                              makeListDefault={this.props.makeListDefault}
                                              editListName={this.props.editListName}
                                              item={item}/>}/>
          <Button
            color={colors.buttons}
            title={!this.state.showInput ? 'Add new list' : 'Cancel'}
            onPress={this.handleAddNewListButtonClick}/>
          <TextInput
            style={[styles.inputText, !this.state.showInput && {display: 'none'}]}
            placeholder="Add new list..."
            onChangeText={(text) => this.setState({inputText: text})}
            onSubmitEditing={this.handleAddNewList}
            ref={input => {
              this.textInput = input
            }}
          />
        </ScrollView>

      </View>
    )
  }

  generateKey = () => {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  };

  handleAddNewListButtonClick = () => {
    this.setState({
      showInput: !this.state.showInput
    })
  };

  handleAddNewList = () => {
    if (this.state.inputText !== '') {
      let newList = {key: this.generateKey(), default: false, name: this.state.inputText, toDoItems: []};
      this.props.addNewList(newList);
      this.setState({
        inputText: ''
      });
      this.textInput.clear();
    }
    this.handleAddNewListButtonClick();
  };
}


export default Lists;
