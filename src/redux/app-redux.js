import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';

let newList;
let newSelectedListKey;
let newDefaultListKey;

//
//Initial State
//

const initialState = {
  toDoLists: [
    {
      key: 'f5d47123', name: 'List #1', default: true, toDoItems: [
        {key: 'f5d47a64', text: 'default todo item #1', complete: false},
        {key: 'f1w47a61', text: 'todo item #2', complete: false},
        {key: 'f5d4uj84', text: 'todo item #3', complete: false},
        {key: 'f5lw7a64', text: 'todo item #4', complete: true},]
    },
    {
      key: 'f1wd7a62', name: 'List #2', default: false, toDoItems: [
        {key: 'f5d47q64', text: 'selected todo item #1', complete: false},
        {key: 'fvw47a61', text: 'todo item #2', complete: false},
        {key: 'f5d4vj84', text: 'todo item #3', complete: false},
        {key: 'f5lw7a6v', text: 'todo item #4', complete: true},]
    },
  ],
  toDoListChanged: false,
  listsChanged: false,
  defaultListKey: 'f5d47123',

  selectedListKey: null,
};

//
//Reducer
//

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case'ADD_NEW_TODO_ITEM':
      newList = _.cloneDeep(state.toDoLists);
      newList.forEach((item) => {
        if (item.key === action.listKey) {
          item.toDoItems.push(action.newToDoItem)
        }
      });
      return {
        ...state,
        toDoLists: newList,
        toDoListChanged: !state.toDoListChanged
      };

    case 'REMOVE_TODO_ITEM':
      newList = _.cloneDeep(state.toDoLists);
      newList.map((el) => {
        if (el.key === state.selectedListKey) {
          return el.toDoItems = el.toDoItems.filter((item) => item.key !== action.itemKey);
        }
      })
      return {
        ...state,
        toDoLists: newList,
        toDoListChanged: !state.toDoListChanged
      };
    case 'CHECK_AS_COMPETES_ITEM':
      newList = _.cloneDeep(state.toDoLists);

      for (let i = 0; i < newList.length; i++) {
        if (newList[i].key === state.selectedListKey) {
          for (let j = 0; j < newList[i].toDoItems.length; j++) {
            if (newList[i].toDoItems[j].key === action.itemKey) {
              newList[i].toDoItems[j].complete = !newList[i].toDoItems[j].complete;
            }
          }
        }
      }
      return {
        ...state,
        toDoLists: newList,
        toDoListChanged: !state.toDoListChanged
      };

    case 'ADD_NEW_LIST':
      newList = _.cloneDeep(state.toDoLists);
      newList.push(action.newListItem);
      return {
        ...state,
        toDoLists: newList,
        listsChanged: !state.listsChanged
      };

    case 'SELECT_LIST':
      console.log('SELECT_LIST');
      return {
        ...state,
        selectedListKey: action.listKey,
        listsChanged: !state.listsChanged
      };
    case 'MAKE_LIST_DEFAULT':
      newList = _.cloneDeep(state.toDoLists);
      newList.map((list) => {
        if (list.key === action.listKey) {
          return list.default = !list.default
        }
      })

      return {
        ...state,
        defaultListKey: action.listKey,
        listsChanged: !state.listsChanged,
      };
    case 'REMOVE_LIST':
      console.log('REMOVE_LIST');
      return state;

    default:
      return state;
  }
};

//
//Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export {store};

//
//Action creators..
//

const addNewToDoItem = (listKey, newToDoItem) => {
  return {
    type: 'ADD_NEW_TODO_ITEM',
    listKey: listKey,
    newToDoItem: newToDoItem,
  }
};
const removeToDoItem = (itemKey) => {
  return {
    type: 'REMOVE_TODO_ITEM',
    itemKey: itemKey,
  }
};
const addNewList = (newListItem) => {
  return {
    type: 'ADD_NEW_LIST',
    newListItem: newListItem,
  }
};
const removeList = (listKey) => {
  return {
    type: 'REMOVE_LIST',
    listKey: listKey,
  }
};
const selectList = (listKey) => {
  return {
    type: 'SELECT_LIST',
    listKey: listKey,
  }
};
const checkAsCompletedItem = (itemKey) => {
  return {
    type: 'CHECK_AS_COMPETES_ITEM',
    itemKey: itemKey,
  }
};
const makeListDefault = (listKey) => {
  return {
    type: 'MAKE_LIST_DEFAULT',
    listKey: listKey
  }
};

export {
  addNewToDoItem,
  removeToDoItem,
  addNewList,
  removeList,
  selectList,
  checkAsCompletedItem,
  makeListDefault
};

