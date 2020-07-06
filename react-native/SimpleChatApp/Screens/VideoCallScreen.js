import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, FlatList, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default class  VideoCallScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerShown: false,
        }
    }


    render(){

        return(
            <View style={styles.container}>
                <Text> Video Call Screen </Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    

});


