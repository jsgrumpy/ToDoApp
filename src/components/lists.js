import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TextInput, Button, ScrollView} from 'react-native';

import ListItem from './listItem'

class Lists extends Component {
  state = {
    showInput: false,
    inputText: '',
    extraData: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            extraData={this.props.listsChanged}
            data={this.props.toDoLists}
            renderItem={({item}) => <ListItem removeList={this.props.removeList}
                                              selectList={this.props.selectList}
                                              makeListDefault={this.props.makeListDefault}
                                              editListName={this.props.editListName}
                                              item={item}/>}
          />
          <Button title={!this.state.showInput ? 'Add new list' : 'Cancel'} onPress={this.handleAddNewListButtonClick}/>
          <TextInput
            style={[{height: 40}, !this.state.showInput && {display: 'none'}]}
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
    let newList = {key: this.generateKey(), default:false, name: this.state.inputText, toDoItems: []};

    this.props.addNewList(newList);
    this.setState({
      inputText: ''
    });
    this.textInput.clear();
  };


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


export default Lists;
