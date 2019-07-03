import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {styles, colors} from '../styles/generalStyles';

class ListItem extends Component {

  state = {
    editable: false,
    inputText: this.props.item.name
  };

  makeItemTextEditable = () => {
    this.setState({editable: true});
    this.textInput.focus();
  };

  handleSubmit = () => {
    this.props.editListName(this.props.item.key, this.state.inputText)
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
                                                   ref={input => {
                                                     this.textInput = input}}/>) :
      (<Text style={styles.text}
             onPress={() => this.props.selectList(this.props.item.key)}
             onLongPress={this.makeItemTextEditable}>
        {this.props.item.name}
      </Text>);
    return (
      <View style={styles.listItem}>
        {layOut}
        <View style={styles.iconContainer}>
          <Icon name={!this.props.item.default? 'star-o' : 'star'} size={30} color={colors.starIcon}
                style={styles.icons}
                onPress={() => this.props.makeListDefault(this.props.item.key)}/>
          <Icon name="trash-o" size={30} color={colors.iconColor}
                style={styles.icons}
                onPress={() => this.props.removeList(this.props.item.key)}/>
        </View>
      </View>
    )
  }
}


export default ListItem;
