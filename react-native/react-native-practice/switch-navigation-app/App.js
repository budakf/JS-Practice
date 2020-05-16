import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOneStyle:{
    borderWidth: 30,
    backgroundColor: 'orange',
    borderColor: 'red'
  },
  containerTwoStyle:{
    borderWidth: 30,
    backgroundColor: 'lightblue',
    borderColor: 'teal'
  }
});


export class ScreenComponentOne extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
    <View style={[styles.container, styles.containerOneStyle]}> 
        <Button title="Go To Screen Two" onPress={ () => this.props.navigation.navigate("RouteNameTwo") }/> 
    </View>
    )
  }
}

export class ScreenComponentTwo extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
    <View style={[styles.container,styles.containerTwoStyle]}> 
        <Button title="Go To Screen One" onPress={ () => this.props.navigation.navigate("RouteNameOne") } /> 
    </View>
    )
  }
}


const AppNavigator = createSwitchNavigator(
  
  {
  RouteNameOne: ScreenComponentOne,
  RouteNameTwo: ScreenComponentTwo,
  },
  {
    initialRouteName: 'RouteNameOne',
  }

)

export default createAppContainer(AppNavigator);
