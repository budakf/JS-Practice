import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

import ContactDetailsScreen from './screens/ContactDetailsScreen'
import RecentCallsScreen from './screens/RecentCallsScreen'
import ContactFormScreen from './screens/ContactFormScreen'
import ContactListScreen from './screens/ContactListScreen'
import SettingsScreen from './screens/SettingsScreen'
import LoginScreen from './screens/LoginScreen'


const ContactNavigator = createStackNavigator(
  {
    ContactListScreen:{
      screen: ContactListScreen,
    },
    ContactDetailsScreen:{
      screen: ContactDetailsScreen,
    },
    ContactFormScreen:{
      screen: ContactFormScreen,
    },
  },
  {
    initialRouteName: 'ContactListScreen',
  }
)


const MainNavigator= createBottomTabNavigator(
  {
    ContactNavigator:{
      screen: ContactNavigator,
      navigationOptions: {
        tabBarLabel: 'Contacts',
        tabBarIcon : ({ tintColor }) => (
          < Ionicons name='md-contacts' color={tintColor} size={25} />
        ),
      }
    },
    RecentCallsScreen:{
      screen: RecentCallsScreen,
    },
    SettingsScreen:{
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: 'ContactNavigator'
  }
)

const AppNavigator = createSwitchNavigator(
  {
    LoginScreen:{
      screen: LoginScreen,
    },
    MainNavigator:{
      screen: MainNavigator,
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component{
  
  constructor(props){
    super(props)
  }

  render(){
    return (
      <AppContainer 
        screenProps={
          {}
        }
      />
    )
  }
}

