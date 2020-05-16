import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import  Ionicons  from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
  login:{
    flex:1,
    backgroundColor:"teal",
    justifyContent:"center",
    alignItems:"center",
  },
  firstScreen:{
    flex:1,
    backgroundColor:"orange",
    justifyContent:"center",
    alignItems:"center",
  },
  secondScreen:{
    flex:1,
    backgroundColor:"lightblue",
    justifyContent:"center",
    alignItems:"center",
  },
  thirdScreen:{
    flex:1,
    backgroundColor:"purple",
    justifyContent:"center",
    alignItems:"center",
  }
})


class LoginScreen extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.login}>
        <Button title="Go to Main Page" onPress={ () => this.props.navigation.navigate("Main") } />
      </View>
    )
  }

}


class FirstScreen extends React.Component{

  constructor(props){
    super(props)
  }

  static navigationOptions = ({navigation}) => (
    {
      tabBarLabel: 'Home',
      tabBarIcon : ({ tintColor }) => (
        < Ionicons name='md-home' color={tintColor} size={25} />
      ),
      // tabBarComponent: ({screenProps}) =>(
          // Ilk tab in componentini degistirmemizi sağlar
      // )
    }
  )

  render(){
    return(
      <View style={styles.firstScreen}>
        <Text> { this.props.screenProps.txt } </Text>
      </View>
    )
  }

}


class SecondScreen extends React.Component{

  constructor(props){
    super(props)
  }
  
  static navigationOptions = ({navigation}) =>(
    {
      tabBarLabel: "Settings",
      tabBarIcon: ({tintColor}) => (
        <Ionicons name='md-settings' color={tintColor} size={25} />
      )
    }
  )

  render(){
    return(
      <View style={styles.secondScreen}>
      </View>
    )
  }

}


class ThirdScreen extends React.Component{

  constructor(props){
    super(props)
  }
  
  static navigationOptions = ({navigation}) =>(
    {
      tabBarLabel: "Settings",
      tabBarIcon: ({tintColor}) => (
        <Ionicons name='md-settings' color={tintColor} size={25} />
      )
    }
  )

  render(){
    return(
      <View style={styles.thirdScreen}>
      </View>
    )
  }

}


const MainNavigator = createBottomTabNavigator(
  {
    FirstScreen: {
      screen: FirstScreen,
    },
    SecondScreen:{
      screen: SecondScreen,
    },
    ThirdScreen:{
      screen: ThirdScreen,
    },
  },
  {
    initialRouteName: "FirstScreen",
    tabBarOptions: {
      activeTintColor: 'red',
      style:{
        //marginTop:50,
        backgroundColor:'gray',
      }
    }
  
  },

)

const AppNavigator = createSwitchNavigator(
  {
    Login:{
      screen: LoginScreen,
    },
    Main: {
      screen: MainNavigator,
    }
  },
  {
    initialRouteName: 'Login',
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
        screenProps={{
            txt: "Property From ScreenProps",
        }}

    />
    )
  }
}

