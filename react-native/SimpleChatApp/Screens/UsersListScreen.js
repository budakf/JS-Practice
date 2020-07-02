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
            email: '',
            uid: '',
            fontLoaded: false,
        }

    }

    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf')
        });
        this.setState({ fontLoaded: true })

        this.getUsers()

    }

    static navigationOptions = ({ navigation }) => {
        return{
            title:"",
            headerStyle:{
                backgroundColor: '#0F4B73',
            },
            headerTintColor: 'white',
            headerRight: () => ( 
                <MaterialIcons name="exit-to-app" color="white" size={35}  onPress={() => console.log("Quit") } /> 
            )
        }
    }

    componentDidMount = () => {
        AsyncStorage.setItem( 'loginState', 'login' )
        this.setState( { email: auth.currentUser?.email }, async () => { await AsyncStorage.setItem( 'email', auth.currentUser?.email ) } )
        this.setState( { uid: auth.currentUser?.uid }, async () => { await AsyncStorage.setItem( 'email', auth.currentUser?.uid ) } )
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
        Toast.show('Logout Successfully', Toast.LONG)
        this.props.navigation.navigate('LoginScreen')
        await AsyncStorage.setItem( 'loginState', 'logout' )
        await AsyncStorage.setItem( 'email', '' )
        await AsyncStorage.setItem( 'uid', '' )
    } 

    quitApp = async () => {
        try{
            auth.signOut().then( () => this.signOut() ).catch(function(error) {
                console.log(error)
            });

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


