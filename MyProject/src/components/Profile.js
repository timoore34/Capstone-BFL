import React, { Component }  from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button,  TouchableHighlight, Alert, ImageBackground, Image } from 'react-native';
import Questions from './Questions'

export default class Profile extends Component {
    constructor(props) {
        super(props);
      }

    render() {  
        const {name}  = this.props.route.params;
        let bckImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Computer-screen-code-glitch-animation-gif-background-free.gif/1024px-Computer-screen-code-glitch-animation-gif-background-free.gif';
        let propix = 'https://media.giphy.com/media/l2QDNZycuKsdGKbu0/giphy.gif';
        return (
            <View style={styles.container}>
            <ImageBackground source={{uri: bckImg}} style={{width: '100%', height: '100%'}}>
              <Text style={styles.welcometxt}><Image source={{uri: propix}} style={styles.profilePic}></Image> Welcome, {name}!</Text>  
              <Text style={styles.userRanking}>Ranking: </Text>
              <Text style={styles.userKarma}>Karma: </Text>
              <Questions user={name} nav={this.props.navigation} /> 
            </ImageBackground>
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
    welcometxt: {
      fontSize: 25,
      color: "#42a1f5",
      backgroundColor: "#000", 
      paddingLeft: 150,
      paddingTop: 50,
    },
    profilePic: {
      width: 100,
      height: 100, 
      position: 'absolute',
    },
    userRanking: {
      marginTop: 100,
      padding: 15,
      backgroundColor: 'black',
      opacity: .75,
      fontWeight: 'bold',
      fontSize: 20, 
      color: '#e3228c', 
    },
    userKarma: {
      marginTop: 50,
      padding: 15,
      backgroundColor: 'black',
      opacity: .75,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#d922e3', 
    }
  }); 