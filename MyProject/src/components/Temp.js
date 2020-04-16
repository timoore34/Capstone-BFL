import React, { useEffect, useReducer }  from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'; 
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'; 
import { createTodo } from './src/graphql/mutations';
import { listTodos } from './src/graphql/queries';
import { onCreateTodo } from './src/graphql/subscriptions';

// Just for making auth work with app
// import { withAuthenticator } from "aws-amplify-react-native"

import config from './aws-exports'
Amplify.configure(config)         // Configure Amplify
API.configure(config)             // Configure Amplify
PubSub.configure(config) 

// store the form state
state = {
  username: '', email: '', password: ''
}

// sign the user up
async function signUp() {
  const { username, email, password } = this.state
  await Auth.signUp({ username, password, attributes: { email }})
  console.log('user successfully signed up')
} 

async function createNewTodo() {
  const todo = { name: "Just testing" , description: "Am I crazy?"}
  await API.graphql(graphqlOperation(createTodo, { input: todo }));
}
 
const initialState = {todos:[]};
const reducer = (state, action) =>{
  switch(action.type){
    case 'QUERY':
      return {...state, todos:action.todos}
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state
  }
} 

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    getData()
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({type:'SUBSCRIPTION', todo})
      }
  })
  return () => subscription.unsubscribe()
}, []) 

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }

    let loading = 'https://d2v9k5u4v94ulw.cloudfront.net/assets/images/392400/original/f4ec8c7f-1ff5-410c-b08a-d26e9c62111f.gif?1463729173'; 
    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.bigRed}>Hello, World!</Text>
        <Text>Does this apply real time?</Text>
        <Text>No fucking way!</Text>
        <Text>Did this just fucking work?</Text>
        <Text>Yes.</Text>
        <Image source={require('./img1.png')} />
        <TextInput style={styles.tin} placeholder='Enter name here'></TextInput>
        <Button onPress={createNewTodo} title='Create Todo' /> 
        { state.todos.map((todo, i) => <Text key={todo.id}>{todo.name} : {todo.description}</Text>) }
      <View>
        <Image source={{uri: loading}} style={styles.pic}/> 
      </View>
      </View>
      </ScrollView>
  
    )

}

const styles = StyleSheet.create({
  container: {
	paddingTop: 150,
    flex: 1,
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRed: {
    color: 'aqua',
    fontWeight: 'bold',
    fontSize: 30, 
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
});

// New ----
//  export default withAuthenticator(App, true)  