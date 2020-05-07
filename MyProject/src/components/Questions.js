import React, { Component }  from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight} from 'react-native';
import Amplify, { Auth } from 'aws-amplify'; 
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';

import config from 'C:/Users/Tina Moore/Documents/GitHub/Capstone-BFL/MyProject/aws-exports'

Amplify.configure(config)         // Configure Amplify
API.configure(config)             // Configure Amplify
PubSub.configure(config) 

const jsonData = {"quiz" : {
  "tutorial_set" : {
    "question1" : {
      "questionCode" : "TTSV1",
      "options" : {
        "option1" : "Yes",
        "option2" : "No"
      },
      "question" : "Are you an extroverted person?"
    },
    "question2" : {
      "questionCode" : "TTSV2",
      "options" : {
          "option1" : "Yes",
          "option2" : "No"
        },
      "question" : "Do you consider yourself to be an athlete?"
    },
    "question3" : {
      "questionCode" : "TTSV3",
      "options" : {
          "option1" : "Yes",
          "option2" : "No"
        },
      "question" : "Have you graduated from high school?"
    },
    "question4" : {
      "questionCode" : "TTSV4",
      "options" : {
          "option1" : "Yes",
          "option2" : "No"
        },
      "question" : "Do you believe in astrology?"
    },
    "question5" : {
      "questionCode" : "TTSV5",
      "options" : {
          "option1" : "Yes",
          "option2" : "No"
        },
      "question" : "Are you a POC?"
    }
  }
}
}
 

const AddQuestion = `
mutation ($code: String! $user: String! $answered: Boolean $answer: Boolean ) {
  createTopic(input: {
    code: $code
    user: $user
    answered: $answered
    answer: $answer
  }) {
    code user answered answer 
  }
}
`;

let qno = 0
let arrnew = [] 
export default class Questions extends Component {
    constructor(props) {
        super(props);
        const jdata = jsonData.quiz.tutorial_set
        arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
        console.log(arrnew);
        console.log(arrnew[qno].question);
        this.state = {
          code: arrnew[qno].questionCode,
          question : arrnew[qno].question,
          options : arrnew[qno].options,
          questionCode : arrnew[qno].questionCode,
          arrnew: arrnew,
          qno: qno
        }    
      }

      state = {
        answered: false,
        answer: false,
        type: ''
      } 
      onButtonClickHandler = () => {
        if(this.state.type === "Yes"){
          this.setState({answer: true, answered: true}, () => {console.log(this.state.answer);});
        }
        if(this.state.type === "No"){
          this.setState({answer: false, answered: true}, () => {console.log(this.state.answer);});
        }
      };
      
      addQuestion = async () => {
        const topic = { code: this.state.code, user: this.props.user, answered: this.state.answered, answer: this.state.answer };
        try {
          if(qno <= arrnew.length-1){
            qno++
            this.setState({ answered: false, question: arrnew[qno].question, options: arrnew[qno].options, code : arrnew[qno].questionCode})
          }
          // this.setState({ users, email: '', username: '', password: '' });
          console.log('topic: ', topic);
          await API.graphql(graphqlOperation(AddQuestion, topic));
          console.log('success');
        } catch (err) {
          console.log('error: ', err);
        }
      }; 

    render() {  
      const currentOptions = this.state.options
      const options = Object.keys(currentOptions).map( function(k) { return currentOptions[k] });
  
        return (
            <View style={styles.container}>
               <View style={{ flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',}}>
                {qno <= 4 &&
                        <View> 
                       <Text style={styles.topicTxt}>{this.state.question}</Text> 
                       <View style={{flexDirection:"row"}}>
                         {options.map(s => (<TouchableHighlight onPress={() => {
                           this.setState({type: s}, () => this.onButtonClickHandler());
                          }}> 
                           <Text style={styles.gameTopics}>{s}</Text>
                            </TouchableHighlight>
                           ))}
                       </View>
                       <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addQuestion}>
                         <Text style={styles.signUpText}>Submit</Text>
                       </TouchableHighlight> 
                        </View>
                }
                 {qno > 4 &&
                  <View> 
                    <Text style={styles.topicTxt}>ALL QUESTIONS ANSWERED</Text>
                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={()=> this.props.nav.navigate("Game")}> 
                      <Text style={styles.signUpText}>Find Game</Text>
                    </TouchableHighlight>  
                  </View>
                 }
               </View>
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
    topicTxt: {
      marginTop: 50,
      padding: 15,
      paddingLeft: 50,
      backgroundColor: 'black',
      opacity: .75,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#42a1f5', 
    },
    gameTopics: {
        margin: 50,
        padding: 25,
        backgroundColor: 'black',
        opacity: .75,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#42a1f5', 
      }, 
      buttonContainer: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 55,
        width:250,
        borderRadius:30,
      },
      signupButton: {
        backgroundColor: "#FF4DFF",
      },
      signUpText: {
        color: 'white',
        fontSize: 25,
      } 
  }); 