import React, { Component }  from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button,  TouchableHighlight, Alert } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'; 
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import SignUp from './src/components/SignUp'
import Login  from './src/components/Login'
import Profile from './src/components/Profile'
import Game from './src/components/Game'


const Stack = createStackNavigator();
let loading = 'https://d2v9k5u4v94ulw.cloudfront.net/assets/images/392400/original/f4ec8c7f-1ff5-410c-b08a-d26e9c62111f.gif?1463729173'; 
export default class App extends Component {

  render() {  
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Game" component={Game} /> 
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
