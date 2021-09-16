import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import store from './redux/store';
enableScreens();

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