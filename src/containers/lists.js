import Lists from '../components/lists';

import {connect} from 'react-redux';
import {
  addNewList,
  selectList,
  removeList,
  makeListDefault,
  editListName,
} from '../redux/app-redux';


const mapStateToProps = (state) => {
  return {
    listsChanged: state.listsChanged,
    toDoLists: state.toDoLists,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewList: (listKey, listName) => {
      dispatch(addNewList(listKey, listName))
    },
    selectList: (listKey) => {
      dispatch(selectList(listKey))
    },
    removeList: (listKey) => {
      dispatch(removeList(listKey))
    },
    makeListDefault: (listKey) => {
      dispatch(makeListDefault(listKey))
    },
    editListName: (listKey, newListName) => {
      dispatch(editListName(listKey, newListName))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Lists);
