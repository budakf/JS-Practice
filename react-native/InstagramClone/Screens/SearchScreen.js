import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';


export default class SearchScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <View style={styles.container} >
                <Text> Search Screen </Text>
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