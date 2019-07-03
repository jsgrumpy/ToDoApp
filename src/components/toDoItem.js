import Icon from 'react-native-vector-icons/FontAwesome';

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {styles, colors} from '../styles/generalStyles';

class ToDoItem extends Component {

  state = {
    editable: false,
    inputText: this.props.item.text
  };

  componentDidUpdate() {
    if (this.state.editable) {
      this.toDoEditingInput.focus();
    }
  }

  makeItemTextEditable = () => {
    if (!this.props.item.complete) {
      this.setState({editable: true});
    }
  };
  handleSubmit = () => {
    if (!this.props.item.complete && this.state.inputText !== '') {
      this.props.editToDoItem(this.props.item.key, this.state.inputText)
    }
  };

  handleBlur = () => {
    this.setState({editable: false})
  };

  render() {
    let layOut = this.state.editable ? (
        <TextInput
          value={this.state.inputText}
          onChangeText={(text) => this.setState({inputText: text})}
          onSubmitEditing={this.handleSubmit}
          onBlur={this.handleBlur}
          ref={input => {
            this.toDoEditingInput = input
          }}/>) :
      (<View style={styles.text}><Text>{this.props.item.text}</Text></View>);
    return (
      <View style={styles.listItem}>
        <Icon style={styles.icons} name={this.props.item.complete ? 'check-circle-o' : 'circle-o'} size={30}
              color={colors.iconColor}
              onPress={() => this.props.checkAsCompletedItem(this.props.item.key)}/>
        {layOut}
        <View style={styles.iconContainer}>
          {!this.props.item.complete && <Icon style={styles.icons} name={'edit'} size={30} color={colors.iconColor}
                                              onPress={this.makeItemTextEditable}/>}
          <Icon style={styles.icons} name="trash-o" size={30} color={colors.iconColor}
                onPress={() => this.props.removeToDoItem(this.props.item.key)}/>
        </View>
      </View>
    )
  }
}


export default ToDoItem;
