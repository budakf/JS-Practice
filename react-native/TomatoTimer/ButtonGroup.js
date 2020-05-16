import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ButtonGroup extends React.Component {

    constructor(props){
        super(props)
        this.state={
            
        }
    }

  render(){
    return (
      <View style={styles.buttonContainer}>
        { this.props.buttonNames.map( (buttonName, key ) => (
            <TouchableOpacity key={key} style={styles.button} 
            onPress={ this.props.functions[key] }
            >
            <Text style={{color:"white"}} > {buttonName} </Text>
            </TouchableOpacity> 
        ))}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 60,
      },
    
    button: {
        paddingLeft: 20, 
        paddingRight: 20,
        paddingTop: 30, 
        paddingBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#C82922',
        borderRadius:40,
    },
});