import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/AppNavigator';
import LogIn from './screens/login';
import Routes from './screens/routs'

let flag = 0;

initialState = {

  name: '',
  email: '',
  password: '',
  DOB: ''

}

const reducer = (state = initialState, action) =>{
  switch (action) {
    case 'SIGN_UP':
    return
    {name: state.name = action.payload.name}        
    {email: state.email = action.payload.email}
    {password: state.password = action.payload.password}
    {DOB: state.DOB = action.payload.DOB}         
    case 'LOG_IN':
    return
    localStorage.setItem("user", JSON.stringify(action.payload));        
  }

  return state
}

const store = createStore(reducer);
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        />
        );
    } else {
      return (
        <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider  store={store}>
        <Routes />
        </Provider>          
        </View>
        );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
      ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
