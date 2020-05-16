import React from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';


export default class ContactFormScreen extends React.Component{
    
    constructor(props){
        super(props)
    }

    static navigationOptions = ({navigation}) => (
        {
            headerTitle: 'Add Contact',
            headerTitleAlign: 'center',
        }
    )

    render(){
        return(
            <View style={styles.container}>
                <Text> Coming Soon ... </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    input: {
        
    },
    
    button: {

    },

});