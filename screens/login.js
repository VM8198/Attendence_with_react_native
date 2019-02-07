import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';
import Config from '../config';
import AppNavigator from '../navigation/AppNavigator'

config = new Config();


class LogIn extends React.Component {

  static navigationOptions = {
    title: 'LogIn',
  }

  state = {
    email: "",
    password: ""
  } 

  render(){
    const goToSignIn = () => {
    Actions.signup()
  }
      
    return(
      <View style={styles.container}>  
      
                 
      <View  style={styles.inputContainer}>
      <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
               onChangeText={(text)=>this.setState({email: text})}/>
      </View>          
      <View style={styles.inputContainer}>
      <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text)=>this.setState({password: text})}/>
      </View>        
      <View style={styles.btn}>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}  onPress = {()=>this.props.logIn(this.state)}>
         <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight> 

       <TouchableHighlight style={styles.buttonContainer}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>
                
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress = {goToSignIn}>  
      <Text>Register here</Text>
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
    logIn: (text) => {
      if(text.email == ""){
        alert("Enter Email");       
      }
      else if(text.password == ""){
        alert("Enter Password");       
      }      
      else {
        var body = {email: text.email,password: text.password}
        console.log("body",body);
        axios.post(config.getBaseUrl()+"user/login",body)
        .then(res=>{
          console.log("Logged in successfully");
           dispatch({ type: 'LOG_IN',
                      payload: res});
           Actions.Tab();
        },err=>{         
             alert("wrong credentials");         
        }) 
      }      
    }
  }
}

   

export default connect(mapStateToProps,mapDispatchToProps)(LogIn)
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
  }
  
});                

