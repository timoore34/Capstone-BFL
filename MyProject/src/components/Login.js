import React, { Component }  from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button,  TouchableHighlight, Alert } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'; 
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';

import config from 'C:/Users/Tina Moore/Documents/GitHub/Capstone-BFL/MyProject/aws-exports'

Amplify.configure(config)         // Configure Amplify
API.configure(config)             // Configure Amplify
PubSub.configure(config) 

const ListUsers = `
query {
  listUsers {
    items {
      id username password
    }
  }
}
`;

let isUser = false; 

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      users: []
    };
  }

  async componentDidMount() {
    try {
      const users = await API.graphql(graphqlOperation(ListUsers));
      console.log('u: ', users);
      this.setState({ users: users.data.listUsers.items });
    } catch (err) {
      console.log('error: ', err);
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  checkUser = async () => {
    if (this.state.username === '' || this.state.password === '') return;
    const user = { username: this.state.username, password: this.state.password };
    if(this.state.users.some(u => u.username === user.username)) {
        console.log("user exist", user.username); 
        isUser = true; 
    }else {
        console.log("user does not exist", user.username); 
        isUser = false; 
    }
    
  };

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.bigRed}>Login!</Text>
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
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => {
                  this.setState({password});
                  this.checkUser(); 
              }}
              value={this.state.password} 
          />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
        onPress={() => isUser ? this.props.navigation.navigate("Profile", { name: this.state.username, }) : this.props.navigation.navigate("SignUp")}> 
        <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>

        <Text onPress={()=> this.props.navigation.navigate("SignUp")}>Don't have an account? Sign up!</Text>
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