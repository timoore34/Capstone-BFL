import React, { Component }  from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button,  TouchableHighlight, Alert } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'; 
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';

import config from 'C:/Users/Tina Moore/Documents/GitHub/Capstone-BFL/MyProject/aws-exports'

Amplify.configure(config)         // Configure Amplify
API.configure(config)             // Configure Amplify
PubSub.configure(config) 


const AddUser = `
mutation ($email: String! $username: String! $password: String! ) {
  createUser(input: {
    email: $email
    username: $username
    password: $password
  }) {
    id email username password 
  }
}
`;

export default class SignUp extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    users: []
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  addUser = async () => {
    if (this.state.email === '' || this.state.username === '') return;
    const user = { email: this.state.email, username: this.state.username, password: this.state.password };
    try {
      const users = [...this.state.users, user];
      this.setState({ users, email: '', username: '', password: '' });
      console.log('users: ', users);
      await API.graphql(graphqlOperation(AddUser, user));
      console.log('success');
    } catch (err) {
      console.log('error: ', err);
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.bigRed}>Sign Up!</Text>
        <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={val => this.onChangeText('username', val)}
              value={this.state.username}
            /> 
        </View>
    
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              underlineColorAndroid='transparent'
              onChangeText={val => this.onChangeText('email', val)}
              value={this.state.email}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
              value={this.state.password} 
          />
        </View>
    
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addUser}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRed: {
    color: 'aqua',
    fontWeight: 'bold',
    fontSize: 30, 
    paddingBottom: 25, 
  },
  tin: { 
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  pic: {
    width: 350,
    height: 250
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
signupButton: {
  backgroundColor: "#FF4DFF",
},
signUpText: {
  color: 'white',
} 
}); 