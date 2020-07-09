import React from 'react';
import { StyleSheet, Text, View,  StatusBar, FlatList } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import * as Font from 'expo-font';

import {auth} from '../FirebaseAuthentication'

export default class  UsersListScreen extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            uid: '',
        }

    }

    async UNSAFE_componentWillMount() {
        await this.getUsers()
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
            )
        }
    }

    componentDidMount = async () => {
        this.props.navigation.setParams({ signOut: () => this.signOut() })
    }

    getUsers = async () => {

        const result = await fetch('http://192.168.1.24:4040/users', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            },
        })

        let users = await result.json() 
        users = await users.map( (user, index) =>  user[ Object.keys(user)[0] ] ) // Object.keys(user) 1 elemanlıdır, email

        this.setState({users})

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
                this.props.navigation.navigate("ConnectionScreen")
            } }
        />
    )

    signOut = async () => {
        try{
            auth.signOut().then( () => console.log("success") ).catch( (error) => console.log(`${error}`) );
            await AsyncStorage.removeItem( 'uid' )
            this.props.navigation.navigate('LoginScreen')
            Toast.show('Logout Successfully', Toast.LONG)
         }
         catch(error){
             Toast.show("Logout error", Toast.LONG)
         }
    }

    render(){

        return(
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={this.state.users}
                        renderItem= { this.renderItem }
                        keyExtractor={item => item.uid}
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


