import React from 'react';
import { StyleSheet, Icon, View, Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
// import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import LoginScreen from "./Screens/LoginScreen"
import HomeScreen from "./Screens/HomeScreen"
import SearchScreen from "./Screens/SearchScreen"
import ProfileScreen from "./Screens/ProfileScreen"
import GalleryNavigator from "./Screens/Gallery/GalleryNavigator"
import ActivityScreen from "./Screens/ActivityScreen"


const HomeNavigator = createStackNavigator(
  {
    HomeScreen:{
      screen: HomeScreen,  
      navigationOptions:{
        tabBarLabel: () => {null},
        tabBarIcon: ({tintColor}) => (
          < MaterialIcons  name='home' color={tintColor} size={35} />
        ),
      },
    },
  },

)


const BottomNavigator = createBottomTabNavigator(
   {
    HomeNavigator:{
          screen: HomeNavigator,  
          navigationOptions:{
            tabBarLabel: () => {null},
            tabBarIcon: ({tintColor}) => (
              < MaterialIcons  name='home' color={tintColor} size={35} />
            ),
          },
        },
        SearchScreen:{
          screen: SearchScreen, 
          navigationOptions:{
            tabBarLabel: () => {null},
            tabBarIcon: ({tintColor}) => (
              < Ionicons name='ios-search' color={tintColor} size={35} />
            )
          }
        },
        GalleryNavigator:{
          screen: GalleryNavigator, 
          navigationOptions:{
            tabBarLabel: () => {null},
            tabBarIcon: ({tintColor}) => (
              < Feather name='plus-square' color={tintColor} size={35} /> 
            ),
            tabBarVisible: false
          } 
        },
        ActivityScreen:{
          screen: ActivityScreen,
          navigationOptions:{
            tabBarLabel: () => {null},
            tabBarIcon: ({tintColor}) => (
              < Octicons name='heart' color={tintColor} size={35} />
            )
          }
        },
        ProfileScreen:{
          screen: ProfileScreen,
          navigationOptions:{
            tabBarLabel: () => {null},
            tabBarIcon: ({tintColor}) => (
              < EvilIcons name='user' color={tintColor} size={35} />
            )
          } 
        }
    },
    {
      initialRouteName:'HomeNavigator',
      tabBarOptions:{
          activeTintColor: 'black',
          inactiveTintColor: '#eeeeee',
          style:{
              backgroundColor: 'white',
          }
      },
    }
)


const AppNavigator = createSwitchNavigator(
  {
      LoginScreen:{
        screen: LoginScreen,
      },
      BottomNavigator:{
        screen: BottomNavigator,
      }
  },
  {
    initialRouteName: "LoginScreen",
  }
)


const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (
    <AppContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
