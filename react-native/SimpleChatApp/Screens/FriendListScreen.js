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
            email: '',
            uid: '',
            fontLoaded: false,
            friends: []
        }

    }

    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf')
        });
        this.setState({ fontLoaded: true })

        this.getFriends()

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

    componentDidMount = async () => {
        AsyncStorage.setItem( 'loginState', 'login' )
        this.setState( { email: auth.currentUser?.email }, async () => { await AsyncStorage.setItem( 'email', auth.currentUser?.email ) } )
        this.setState( { uid: auth.currentUser?.uid }, async () => { await AsyncStorage.setItem( 'email', auth.currentUser?.uid ) } )   
    }

    getFriends = async () => {

        const result = await fetch(`http://192.168.1.24:4040/users/${auth.currentUser.email}`, {  //      fatihbudak7@hotmail.com
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
            key={item.email}
            title={item.name}
            subtitle={item.surname}
            bottomDivider
            onPress={ () => { 
                console.log(item.name, item.surname, item.email, item.uid) 
                this.props.navigation.navigate("ChatScreen")
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





{/* <Header
    barStyle="light-content"
    containerStyle={{
        backgroundColor: '#0F4B73',
        height: 55,
    }}
    centerComponent={ this.state.fontLoaded && { text: 'Simple Chat App',  style: { color: 'white', marginBottom: 25, fontSize: 25, fontFamily: "DancingScript" } }}
    rightComponent = {
        <View style={{ marginBottom: 20 }} >
            <MaterialIcons name="exit-to-app" color="white" size={35}  onPress={() => this.quitApp() } />
        </View>
    }
/> */}