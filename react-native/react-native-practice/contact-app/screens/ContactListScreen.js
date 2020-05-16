import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, View, Text, Button} from 'react-native';
import ContactList from  '../ContactList'


export class ContactListScreen extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.appContainer}>
                <ContactList 
                    contacts = {this.state.contacts}
                    style = {styles.contactList}
                />
             </View>
        )
    }
}
