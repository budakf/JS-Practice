import React from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'
import FriendListScreen from './Screens/FriendListScreen'
import UsersListScreen from './Screens/UsersListScreen'
import ConnectionScreen from './Screens/ConnectionScreen'
import ChatScreen from './Screens/ChatScreen'
import VoiceCallScreen from './Screens/VoiceCallScreen'
import VideoCallScreen from './Screens/VideoCallScreen'

const AuthenticationStack = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: ({
                headerShown: false,
            })
        },
        SignupScreen: {
            screen: SignupScreen,
        },
    },
    {
        initialRouteName: "LoginScreen"
    },

);

const FriendsAndChatStack = createStackNavigator(
    {
        FriendListScreen:{
            screen: FriendListScreen,
        },
        ChatScreen:{
            screen: ChatScreen,
        },
        VoiceCallScreen:{
            screen: VoiceCallScreen,
        },
        VideoCallScreen:{
            screen: VideoCallScreen,
        },
    },
    {
        initialRouteName: "FriendListScreen",
    }
)

FriendsAndChatStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let tabBarVisible = true
    if (routeName === 'FriendListScreen'){
      tabBarVisible = true;
    }else{
      tabBarVisible = false;
    }
    return {
      tabBarVisible, 
    }
}

const UsersAndConnectionStack = createStackNavigator(
    {
        UsersListScreen:{
            screen: UsersListScreen,
        },
        ConnectionScreen:{
            screen: ConnectionScreen,
        },
    },
    {
        initialRouteName: "UsersListScreen"

    }
)

UsersAndConnectionStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let tabBarVisible = true
    if (routeName === 'ConnectionScreen'){
      tabBarVisible = false;
    }else{
      tabBarVisible = true;
    }
    return {
      tabBarVisible, 
    }
}

const AppScreensNavigator = createMaterialTopTabNavigator(
    {
        FriendsAndChatStack:{
            screen: FriendsAndChatStack,
            navigationOptions:{
                title:"Friends",
            }
        },
        UsersAndConnectionStack:{
            screen: UsersAndConnectionStack,
            navigationOptions:{
                title:"Users",
            }
        },
    },

    {
        initialRouteName: "FriendsAndChatStack",
        tabBarPosition : "bottom",
        tabBarOptions: {
            indicatorStyle:{
                backgroundColor:"white"
            },
            style: {
              backgroundColor: '#0F4B73',
            },
        },
    }
)



const AppEntranceNavigator = createSwitchNavigator(
    {
        AuthenticationStack: {
            screen: AuthenticationStack,
        },
  
        AppScreensNavigator: {
            screen: AppScreensNavigator,
        },
    },
    {
        // initialRouteName: "AppScreensNavigator" 
        initialRouteName: AsyncStorage.getItem('loginState') === "login" ? "AppScreensNavigator" : "AuthenticationStack"
    },
);


const AppContainer = createAppContainer(AppEntranceNavigator);



export default class App extends React.Component{
  
    constructor(props){
        super(props)
        this.state={
            fontLoaded:false,
        }
    }


    render(){

        return (
            <AppContainer/>
        );

    }
    
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

