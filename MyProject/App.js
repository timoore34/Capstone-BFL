import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';

export default function App() {
  let loading = 'https://d2v9k5u4v94ulw.cloudfront.net/assets/images/392400/original/f4ec8c7f-1ff5-410c-b08a-d26e9c62111f.gif?1463729173'; 
  return (

    <ScrollView>
      {/* A JSX comment */}
      <View style={styles.container}>
      <Text style={styles.bigRed}>Hello, World!</Text>
      <Text>Does this apply real time?</Text>
      <Text>No fucking way!</Text>
      <Text>Did this just fucking work?</Text>
      <Text>Yes.</Text>
      <Image source={require('./img1.png')} />
      <TextInput style={styles.tin} placeholder='Enter name here'></TextInput>

    <View>
      <Image source={{uri: loading}} style={styles.pic}/> 
    </View>
    </View>
    </ScrollView>

  );
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
