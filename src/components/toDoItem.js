import Icon from 'react-native-vector-icons/FontAwesome';

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';


class ToDoItem extends Component {

  state = {
    editable: false,
    inputText: this.props.item.text
  };

  makeItemTextEditable = () => {
    if (!this.props.item.complete) {
      this.setState({editable: true});
      this.textInput.focus();
    }

  };
  handleSubmit = () => {
    if (!this.props.item.complete) {
      this.props.editToDoItem(this.props.item.key, this.state.inputText)
    }
  };

  handleBlur = () => {
    this.setState({editable: false})
  };

  render() {
    let layOut = this.state.editable ? (<TextInput style={styles.text}
                                                   value={this.state.inputText}
                                                   onChangeText={(text) => this.setState({inputText: text})}
                                                   onSubmitEditing={this.handleSubmit}
                                                   onBlur={this.handleBlur}
                                                   ref={input => {this.textInput = input}}/>) :
      (<Text>{this.props.item.text}</Text>);
    return (
      <View style={styles.container}>
        <Icon name={this.props.item.complete ? 'check-circle-o' : 'circle-o'} size={30} color="#900"
              onPress={() => this.props.checkAsCompletedItem(this.props.item.key)}/>
        {layOut}
        <Icon name={'edit'} size={30} color="#900"
              onPress={this.makeItemTextEditable}/>
        <Icon name="trash-o" size={30} color="#900"
              onPress={() => this.props.removeToDoItem(this.props.item.key)}/>
      </View>
    )
  }
}


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
