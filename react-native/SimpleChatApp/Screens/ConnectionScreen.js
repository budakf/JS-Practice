import React from 'react';
import { StyleSheet, Text, View,  StatusBar, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default class  ConnectionScreen extends React.Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return{
            title:"",
            headerStyle:{
                backgroundColor: '#0F4B73',
            },
            headerTintColor: 'white',
        }
    }

    render(){

        return(
            <View style={styles.container}>
                <Text> Connection Screen </Text>
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


