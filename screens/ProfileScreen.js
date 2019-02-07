import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    date: "",
    inTime: "",
    outTime: "",
    totalTime: ""
  }

  componentDidMount = () => {
    fetch("",{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);

      this.setState({
        date: response.date,
        inTime: response.inTime,
        outTime: response.outTime,
        totalTime: response.totalTime
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={{ fontSize: 20 }}>
      
      <Text style={{fontSize: 40}}>
      My Logs
      </Text>

      <Text>
      Date : {this.state.date}
      </Text>

      <Text>
      IN Time : {this.state.inTime}
      </Text>

      <Text>
      Out Time : {this.state.outTime}
      </Text>

      </View>
      <View>
      <Text>
      Total time present in office: {this.state.totalTime}
      </Text>
      </View>
      </ScrollView>


      </View>
      );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
