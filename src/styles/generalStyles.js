import {FlatList, StyleSheet} from "react-native";

export const colors = {
  buttons: '#41991D',
  starIcon: '#F7FB7A',
  iconColor: '#174E13',
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  listItemsContainer: {
    marginBottom: 20,
  },
  listItem: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
    height: 50,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    padding: 10,
  },
  separator: {
    flex: 1,
    backgroundColor: '#8E8E8E',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputText: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    height: 50,
    borderWidth: 0.7,
    borderRadius: 4,
    borderColor: '#F5F5F5',
  },
  completedContainer: {
    marginTop: 10,
    borderTopColor: colors.iconColor,
    borderTopWidth: 1,
  },
  text: {
    padding: 20,
    textAlign: 'center'
  }
});
