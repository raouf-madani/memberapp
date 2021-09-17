import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import ReduxThunk from "redux-thunk";
import {createStore,combineReducers,applyMiddleware} from 'redux';
import membersReducer from './redux/reducers/memberReducer';
enableScreens();

//Create the store and the combine reducers
const rootReducer = combineReducers({
  members:membersReducer,
  
  });
  
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {


  return (
    <Provider store={store}> 
        <Navigator />
    </Provider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});