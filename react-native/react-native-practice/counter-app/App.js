import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
  appContainer:{
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
  },
  count:{
      fontSize: 50,
  } 
})

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      count: 0,
    }
  }

  componentDidMount(){
      this.intervalId = setInterval( this.increment, 1000 )
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  increment = () =>{
      this.setState({
        count : this.state.count + 1
      })
  }

  render(){
      return (
        <View style={styles.appContainer}>
          <Text style={styles.count} >{this.state.count}</Text>
        </View>
      );
  }
}

export default  App;