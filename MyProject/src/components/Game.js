import React, { Component }  from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button,  TouchableHighlight, Alert, ImageBackground, Image } from 'react-native';

export default class Game extends Component {
    constructor(props) {
        super(props);
      }

    render() {  
        // const {name}  = this.props.route.params;
        
         return (
            <View style={styles.container}>
              <Text style={styles.userRanking}>Finding a server... </Text>
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
    },
  }); 