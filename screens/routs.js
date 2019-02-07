import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Router, Scene } from 'react-native-router-flux'
import SignUp from './signup';
import LogIn from './login';
import HomeScreen from './HomeScreen'
import AppNavigator from '../navigation/AppNavigator'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "login" component = {LogIn} title = "LogIn" />
         <Scene key = "signup" component = {SignUp} title = "SignUp" />  
         <Scene key = "Tab" component = {HomeScreen} title = 'Home' initial = {true} />   
      </Scene>
   </Router>
)
export default Routes;