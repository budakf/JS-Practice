import React from 'react';
import { StyleSheet, Text, View,  StatusBar, FlatList } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import * as Font from 'expo-font';

import {auth} from '../FirebaseAuthentication'

export default class  FriendListScreen extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            friends: []
        }

    }

    async UNSAFE_componentWillMount() {
        console.log("WILL GET Friends")
        await this.getFriends()
        console.log("GOT Friends")
    } 

    static navigationOptions = ({ navigation }) => {
        return{
            title:"",
            headerStyle:{
                backgroundColor: '#0F4B73',
            },
            headerTintColor: 'white',
            headerRight: () => ( 
                <MaterialIcons name="exit-to-app" color="white" size={35}  onPress={ () => navigation.state.params.signOut() } /> 
            ),
        }
    }

    componentDidMount = async () => {
        this.props.navigation.setParams({ signOut: () => this.signOut() })
    }

    getFriends = async () => {
        const email = await AsyncStorage.getItem('email')
        const result = await fetch(`http://192.168.1.24:4040/users/${email}`, {       
            method: 'GET',
            headers:{ 
                'Content-Type': 'application/json'
            },
        })

        let friends = await result.json() 
        friends = friends["friends"]
        this.setState({friends})

    }

    renderItem = ( { item } ) => (
        <ListItem
            leftAvatar={{ source: { uri: "../assets/user.png" } }}
            key={item.uid}
            title={item.name}
            subtitle={item.surname}
            bottomDivider
            onPress={ () => { 
                console.log(item.name, item.surname, item.email, item.uid) 
                this.props.navigation.navigate("ChatScreen", { 
                    friendName: item.name + " " + item.surname,
                    friendEmail: item.email,
                    friendUid: item.uid
                })
            } }
        />
    )

    signOut = async () => {
        try{
            auth.signOut().then( async () => this.doSignOut() ).catch( (error) => console.log(`${error}`) );
            
         }
         catch(error){
             Toast.show("Logout error", Toast.LONG)
         }
    }

    doSignOut = async () => {
        await AsyncStorage.removeItem( 'uid' )
        this.props.navigation.navigate('LoginScreen')
        Toast.show('Logout Successfully', Toast.LONG)
    }

    render(){
        return(
            <View style={styles.container}>   
               <View>
                    <FlatList
                        data={this.state.friends}
                        renderItem= { this.renderItem }
                        keyExtractor={item => item.email}
                    />
                </View> 
            </View>
        );
    }

}



const styles = StyleSheet.create({

    container:{
        flex:1,
        // alignItems:'center',
        // justifyContent:'center',
    },

});

