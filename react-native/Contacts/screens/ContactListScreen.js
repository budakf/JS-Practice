import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import {fetchUsers, fetchRealUsers} from '../Api'
import ContactListElement from '../ContactListElement';

export default class ContactListScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            contacts: []
        }
    }

    static navigationOptions = ({navigation}) => (
        {
            headerTitle: 'Contacts',
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity  
                    onPress={() => navigation.navigate('ContactFormScreen')}>
                    <Text style={{color:'lightblue', marginRight:10}} > Add </Text>
                </TouchableOpacity> 
            )
        }
    )

    componentDidMount(){
        this.getUsers()
        
    }

    getUsers = async () => {
        const contacts = await fetchUsers()
        this.setState({ contacts: contacts})
    }

    getRealUsers = async () => {
        let data = await fetchRealUsers()
        console.log(data)
    }

    goToDetails = contact => {
        this.props.navigation.navigate("ContactDetailsScreen",{ contact : contact } )
    }

    doCall = contact => {
        this.props.navigation.navigate("RecentCallsScreen",{ call : contact } )
    }

    render(){
        console.log(this.state.contacts)
        return(
            <View style={styles.container}>    
                <ScrollView>
                    {this.state.contacts.map( contact => ( <ContactListElement key={contact.key} contact={contact}  goToDetails={this.goToDetails} doCall={this.doCall}/> ) )}
                </ScrollView>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        alignItems:'stretch',
        justifyContent:'flex-start',
    },

    input: {
        
    },
    
    button: {

    },

});