import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';


export default class ActivityScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <View style={styles.container} >
                <Text> Activity Screen </Text>
                
            </View>
        )
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