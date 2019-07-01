import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';


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
                                                     this.textInput = input
                                                   }}/>) :
      (<Text style={styles.text}
             onPress={() => props.selectList(this.props.item.key)}
             onLongPress={this.makeItemTextEditable}>
        {this.props.item.name}
      </Text>);
    return (
      <View style={styles.container}>
        {layOut}
        <Icon name={!this.props.item.default ? 'star-o' : 'star'} size={30} color="#FFE400"
              onPress={() => this.props.makeListDefault(this.props.item.key)}/>
        <Icon name="trash-o" size={30} color="#900"
              onPress={() => this.props.removeList(this.props.item.key)}/>
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


export default ListItem;
