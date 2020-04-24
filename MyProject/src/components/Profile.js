import React, { Component }  from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button,  TouchableHighlight, Alert } from 'react-native';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   username: ''
        // };
      }

    render() {  
        const {name}  = this.props.route.params;
        return (
            <View style={styles.container}>
            <Text>Welcome {name}!</Text>  
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
  }); 