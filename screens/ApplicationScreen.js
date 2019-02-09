import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Button, Picker, View, TouchableOpacity } from 'react-native';
import Textarea from 'react-native-textarea';
import Autocomplete from 'react-native-autocomplete-input';

export default class ApplicationScreen extends React.Component {
  static navigationOptions = {
    title: 'Send Application',
  };

  state = {    
    applicationData: '',
  }


  render() {

    const { query } = this.state;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const reporting_person = ['rakesh','jay']
    

    return (
      <View style = {styles.container}>
      


      <View>
      <Autocomplete
      // autoCapitalize="none"
      autoCorrect={false}
      containerStyle={styles.autocompleteContainer}
      data={reporting_person.length === 1 && comp(query, reporting_person[0]) ? [] : reporting_person}
      defaultValue={query}
      onChangeText={text => this.setState({ query: text })}
      placeholder="Enter Reporting person"

      renderItem={({ title } ) => (

        <TouchableOpacity onPress={() =>{ 
          console.log("hello");
          this.setState({ query: title })}}>
          <Text style={styles.itemText}>
          {title} 
          </Text>
          </TouchableOpacity>
          )}
      />
      </View>

      <View style = {{flexDirection: 'column'}}>

      <Textarea
      containerStyle={styles.textareaContainer}
      style={styles.textarea}
      onChangeText={(text)=>{this.setState({applicationData: text})}}
      defaultValue={this.state.text}
      maxLength={500}
      placeholder={'Enter your text here'}
      placeholderTextColor={'#c7c7c7'}
      
      />
      <Button style={{marginTop: 15}} title="send" onPress = {()=>this.sendApplication(this.state.applicationData)}/>

      </View>


      </View>
      );
  }

  sendApplication(data){
    console.log(this.state.applicationData);
    console.log(this.state.reporting_person);
    console.log(this.state);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },  
  textareaContainer: {
    height: 250,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top', 
    height: 300,
    margin: 15,
    fontSize: 15,
    color: '#333',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
});
