import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, SectionList,
       ActivityIndicator, PermissionsAndroid, KeyboardAvoidingView } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import { Container, Content, NBHeader, Footer, Left, Right, Body, Title, FooterTab } from 'native-base';
import { Button as NBButton, Icon as NBIcon } from 'native-base';
import Constants from 'expo-constants';

import Contacts from 'react-native-contacts';

import contacts, {compareNames} from './Contacts.js';
import ContactList from  './ContactList.js'
import ContactForm from './ContactForm'
import {store} from './Store'

// import Expo, {AppLoading} from 'expo';


const styles = StyleSheet.create({
  
  // activityLoading: {
  //   flex:1,
  //   alignItems:'center',
  //   justifyContent:'center',
  // },
  
  appContainer: {
      flex: 1,
      alignItems: 'stretch',
      alignContent: 'center',
      justifyContent:'space-between',
      backgroundColor: 'transparent',
  }, 

  contactList: {
      backgroundColor:'orange', 
      marginTop: 0,   
  },   

})

export default class App extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
            hasError: false,
            contacts: contacts, //store.getState().contacts,
            showContactForm: false,
        }
    }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  newContactForm = () => {
    this.setState({ showContactForm : true  })
  }

  addContact = contact => {
    this.setState({
      contacts: [...this.state.contacts,{name:contact.name, phoneNumber:contact.phoneNumber}],
      showContactForm: false,
    })
  }

  render(){
    console.log(store.getState())
    if(this.state.hasError){
      return (<Text> App has some Error </Text>)
    }

    else{
        if(this.state.showContactForm){
          return <ContactForm onSubmit = {this.addContact}/>
        }
        return(
          <Container>
            <Header
              statusBarProps={{ barStyle: 'dark-content', backgroundColor:'teal' }}
              placement="left"
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
              containerStyle={{
                backgroundColor: 'teal',
                justifyContent: 'space-around',
              }}
            />
            <View style={styles.appContainer}>
                <ContactList 
                    contacts = {this.state.contacts}
                    style = {styles.contactList}
                />
            </View>
    
            <Footer>

              <FooterTab style={{backgroundColor: 'teal'}}>
                <NBButton >
                  <NBIcon active name="apps" />
                </NBButton>
              </FooterTab>

              <FooterTab style={{backgroundColor: 'teal'}}>
                <NBButton  >
                  <NBIcon name="navigate" />
                </NBButton>
              </FooterTab>

              <FooterTab style={{backgroundColor: 'teal'}}>
                <NBButton onPress={this.newContactForm}>
                  <NBIcon name="contacts" />
                </NBButton>
              </FooterTab>

            </Footer>

          </Container>
        );

    }

  }

}



//<ScrollView>
//{contacts.map( contact => (<Row {...contact} />) )}
//</ScrollView>

// <FlatList
// data = {this.state.contacts}
// renderItem ={this.renderItem}
// />