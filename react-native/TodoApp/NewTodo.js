import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import { Icon } from 'react-native-elements'


export default class NewTodo extends React.Component{

    constructor(props){
      super(props)
  
      this.state = {
        newTodo:"",
      }
  
    }
  
    render(){
      return (  
          <View style={styles.container}>
            <TextInput style={styles.input}
              value={this.state.newTodo}
              onChangeText={ text => this.setState({newTodo:text}) }
              underlineColorAndroid="transparent"
              placeholder="Add Note"
            />
            <TouchableOpacity 
                onPress={ () => { if(this.state.newTodo === "") return
                  this.props.addTodo(this.state.newTodo)
                  this.setState({newTodo:""})
                  Keyboard.dismiss()
                  }} >
                <Icon name="add" size={20} color="teal" reverse/>
            </TouchableOpacity> 
          </View>
      );
    }
  } 
  
  
  const styles = StyleSheet.create({
    
  
    container:{
      flexDirection:'row',
      alignItems:"center",
      marginBottom:20,
    },
  
    input:{
      flexGrow:1,
      height:50,
      marginLeft:15,
      paddingLeft:5,
      alignItems:"stretch",
      backgroundColor:"white",
      borderWidth:1,
      borderColor:"teal",
      borderRadius:30,
    },
  
  })