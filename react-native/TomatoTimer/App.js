import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';

import ButtonGroup from './ButtonGroup'


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      time:"25:00",
      intervalID:0,
      currentState:"long"
    }
  }

  decreaseTimer = () => {
    if(this.state.time === "00:00"){
      Vibration.vibrate([500, 500, 500])
      this.reset()
      return
    }
    let time = this.state.time.split(":")
    let seconds = (+time[0]) * 60 + (+time[1])
    seconds -= 1

    let min = Math.floor(seconds/60)
    min = min > 9 ? min+"" : "0"+min
    let sec = seconds%60 + ""
    sec = sec > 9 ? sec+"" : "0"+sec

    time = min+":"+sec

    this.setState({
      time: time,
    })

  }

  switchLong = () => {
    if(this.state.intervalID !== 0){
      clearInterval(this.state.intervalID)
      this.setState({
        intervalID: 0,
      })
    }
    this.setState({
      time: "25:00",
      currentState: "long",
    })
  }

  switchShort = () => {
    if(this.state.intervalID !== 0){
      clearInterval(this.state.intervalID)
      this.setState({
        intervalID: 0,
      })
    }
    this.setState({
      time: "05:00",
      currentState: "short",
    })
  }

  start = () => {
    this.setState({
      intervalID: setInterval( this.decreaseTimer, 1000),
    })
  }

  stop = () => {
    if(this.state.intervalID !== 0){
      clearInterval(this.state.intervalID)
    }
    this.setState({
      intervalID: 0,
    })
  }

  reset = () => {
    clearInterval(this.state.intervalID)
    this.setState({
      time: this.state.currentState === "long" ? "25:00" : "05:00",
      intervalID: 0,
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <ButtonGroup  buttonNames={["Long","Short"]}  
          functions={[this.switchLong, this.switchShort]}/>

        <Text style={styles.timer}> { this.state.time } </Text>

        <ButtonGroup  buttonNames={["Start","Stop","Reset"]} 
          functions={[this.start, this.stop, this.reset]}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',    

  },

  timer:{
    fontSize: 70,
    color:"#C82922",
    width:200,
    height:100,
    marginTop:60,
    marginBottom:80,

  },

});

