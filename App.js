import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createDrawerNavigator, createAppContainer, createStackNavigator} from "react-navigation";

import {Provider} from 'react-redux'
import {store} from "./src/redux/app-redux";

import {Lists} from './src/containers';
import HomePage from './src/components/homePage';


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  )
};

const MyDrawNavigator = createDrawerNavigator({
    Home: HomePage,
  },
  {
    contentComponent: Lists
  }
);

const AppContainer = createAppContainer(MyDrawNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
