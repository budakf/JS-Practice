import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';


export default class LoginScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
        }
    }

    login = () => {
        this.props.navigation.navigate('MainNavigator')
    }
    

    handleUsername = username => {
        this.setState({username:username})
    }

    handlePassword = password => {
        this.setState({password:password})
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput text={this.state.username} style={styles.input}
                    autoCapitalize='none'
                    placeholder='username'
                    onChangeText={this.handleUsername}
                />
                <TextInput text={this.state.password} style={styles.input}
                    secureTextEntry
                    autoCapitalize='none'
                    placeholder='password'
                    onChangeText={this.handlePassword}
                />
                <TouchableOpacity title='Press' style={styles.button} 
                    onPress={ this.login }>
                    <Text style={{color:'lightblue'}} > Log in </Text>
                </TouchableOpacity>    
            </View>
        )
    }

}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
        //alignContent: 'center',
        marginBottom: 20, 
    },

    input: {
        paddingTop:10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        marginLeft: 40,
        marginRight: 40,
        borderColor:"lightblue",
        borderWidth:1,
        backgroundColor:'white',
    },
    
    button: {
        marginTop: 15,
        marginLeft: 155,
        marginRight: 155,
        backgroundColor:'white'
    },

});