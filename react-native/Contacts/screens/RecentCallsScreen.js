import React from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';


export default class RecentCallsScreen extends React.Component{
    
    constructor(props){
        super(props)
    }

    static navigationOptions = ({navigation}) => (
        {
            tabBarLabel: 'Calls',
            tabBarIcon : ({ tintColor }) => (
              < Ionicons name='md-call' color={tintColor} size={25} />
            ),
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


});