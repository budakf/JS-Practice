import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import ContactForm from './ContactForm'


export class ContactFormScreen extends React.Component {

    constructor(props){
      super(props)
    }
  
    render(){
      return (
      <View style={[styles.container, styles.containerOneStyle]}> 
          <Button title="Go To Screen Two" onPress={ () => this.props.navigation.navigate("RouteNameTwo") }/> 
      </View>
      )
    }

  }