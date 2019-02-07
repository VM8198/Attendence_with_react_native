import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, TouchableOpacity, Image, ScrollView, TouchableHighlight } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Config from '../config';

config = new Config();

class SignUp extends React.Component {

  static navigationOptions = {
    title: 'SignUp',
  }

  state = {
    name:"",
    email: "",
    password: "",
    DOB: "",
    department: ""
  } 

  render() {

    return (
      <View style={styles.container}> 



      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="Name"
      keyboardType="email-address"
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({name: text})}/>
      </View>

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="Email"
      keyboardType="email-address"
      underlineColorAndroid='transparent'onChangeText={(text)=>this.setState({email: text})}/>
      </View>

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="Password"              
      underlineColorAndroid='transparent'
      secureTextEntry={true} 
      onChangeText={(text)=>this.setState({password: text})}/>
      </View>  

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="Date Of Birth"              
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({DOB: text})}/>
      </View>

      <View>
      <Picker
      selectedValue={this.state.department}
      style={{width: 200, height: 44,color: '#000000'}}
      itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
      onValueChange={(itemValue) =>
        this.setState({department: itemValue})
      }>
      <Picker.Item label="computer" value="computer" />
      <Picker.Item label="mechanical" value="mechanical" />
      <Picker.Item label="EC" value="EC" />
      <Picker.Item label="IC" value="IC" />
      <Picker.Item label="IT" value="IT" />
      </Picker>
      </View>
      <View style={styles.btn}>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress = {()=>this.props.signUp(this.state)}>
      <Text style={styles.loginText}>Register</Text>
      </TouchableHighlight>                 
      </View>  

      </View>
      );
  }
}


function mapStateToProps (state){
  return {
    name: state.name,    
    email: state.email,
    password: state.password,
    DOB: state.DOB
  }
}



function mapDispatchToProps(dispatch){

  return{
    signUp: (text) => {
      if (text.name=="") {
        alert("Enter Name");
      } else if(text.email == ""){
        alert("Enter Email");       
      }
      else if(text.password == ""){
        alert("Enter Password");       
      }
      else if(text.DOB == ""){
        alert("Enter DOB");       
      }
      else {
        var body = {name: text.name,email: text.email,password: text.password,DOB: text.DOB,department: text.department}
        console.log("body",body);
        console.log("ip",config.getBaseUrl());
        axios.post(config.getBaseUrl()+"user/adduser",body)
        .then(res=>{
          dispatch({ type: 'SIGN_UP', payload: body})
          console.log({msg: 'added'});
          Actions.login();               
        },err=>{
          alert("Email Id already registered");
        }) 
      }      
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    color: '#ffffff', 
    marginTop: 10   
  },

  textMain: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  textInput: {
    color:'#fff',
    height: 30,
    width: 200, 
    borderColor: '#ffffff',
    borderWidth: 1 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20
  }
  
});                


