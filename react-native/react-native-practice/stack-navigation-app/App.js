import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({

  login:{
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'teal',
  },
  screenOne : {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:10,
    borderColor: 'teal',
  },
  screenTwo: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:10,
    borderColor: 'orange',
  },
  screenThree: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth:10,
    borderColor: 'purple',
  }

})

export class LoginScreen extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.login}>
        <Button title="Go to Main Page" onPress={ () => this.props.navigation.navigate("Main")} />
      </View>
    )
  }

}

export class ScreenOne extends React.Component{
    
    constructor(props){
      super(props)
    }

    static navigationOptions  =  ({navigation}) => (
      {
        headerTitle: "First Screen",
        headerTintColor: 'teal',
        headerStyle:{
          backgroundColor:'white',
        },
      }
    )

    render(){
        return(
          <View style={styles.screenOne}>
            <Button 
              title=" Go to Screen Two "
              onPress={ () => this.props.navigation.navigate("RouteNameTwo", {param:'Hello From Screen One'})}
              />
          </View>
        )
    }
}


export class ScreenTwo extends React.Component{
    
  constructor(props){
    super(props)
  }

  static navigationOptions  = ({navigation})  => (
    {
    headerTitle: (
      <Button title='Press there' onPress={ () => alert("Pressed there") }  />
    ),
    headerTintColor: 'teal',
    headerStyle:{
      backgroundColor:'white',
    },
   }
  )
    


  render(){
    return(
      <View style={styles.screenTwo}>
        <Button 
          title=" Go to Screen Three "
          onPress={ () => this.props.navigation.navigate("RouteNameThree", {number: Math.floor( Math.random() * 100 ) })}
          />
      </View>
    )
  }
}


export class ScreenThree extends React.Component{
    
  constructor(props){
    super(props)
  }

  static navigationOptions = ({navigation}) => (
    {
      headerTitle: "Third Screen",
      headerTintColor: 'teal',
      headerStyle: {
        backgroundColor:'white',
      },
      headerRight: (
        <Button title="Heey yooo" onPress={ () => navigation.push( "RouteNameThree" ,{ number: Math.floor( Math.random() * 100 ) } ) }/>
      ),
      headerLeft: (
        <Button title="Go Back" onPress={ () => navigation.goBack()}/>
      ),
    }
  )

  render(){
    return(
      <View style={styles.screenThree}>
        <Text> {this.props.navigation.getParam('number')} </Text>
        <Button 
          title="New Number"
          onPress={ () => this.props.navigation.setParams({number: Math.floor( Math.random() * 100 ) })}
          />
        <Button 
          title="Replace"
          onPress={ () => this.props.navigation.replace("RouteNameTwo") }
        />
        <Button 
          title="Go Back"
          onPress={ () => this.props.navigation.goBack()}
          />
      </View>
    )
  }
}


const MainNavigator = createStackNavigator(
  {
    RouteNameOne: {
      screen: ScreenOne,
    },

    RouteNameTwo: {
      screen: ScreenTwo,
    },

    RouteNameThree: {
      screen: ScreenThree,
    },

  },
  {
      initialRouteName: 'RouteNameOne',
  }
)

const AppNavigator = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Main: {
      screen: MainNavigator,
    }
  },
  {
    initialRouteName: "Login"
  }

)

const AppContainer =  createAppContainer( AppNavigator ); 


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){
    console.log("Heey yoooo")
  }

  render(){
    return(
      <AppContainer
        screenProps={{

        }}

      />
    )
  }

}