import ToDoItemsView from '../components/toDoItemsView';

import {connect} from 'react-redux';
import {
  addNewToDoItem,
  removeToDoItem,
  checkAsCompletedItem,
  editToDoItem,
} from '../redux/app-redux';


const mapStateToProps = (state) => {
  return {
    toDoListChanged: state.toDoListChanged,
    toDoLists: state.toDoLists,
    defaultListKey: state.defaultListKey,
    selectedListKey: state.selectedListKey,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewToDoItem: (listKey, toDoItem) => {
      dispatch(addNewToDoItem(listKey, toDoItem))
    },
    removeToDoItem: (itemKey) => {
      dispatch(removeToDoItem(itemKey))
    },
    checkAsCompletedItem: (itemKey) => {
      dispatch(checkAsCompletedItem(itemKey))
    },
    editToDoItem :(itemKey, itemText) =>{
      dispatch (editToDoItem(itemKey, itemText))
  }

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemsView);
