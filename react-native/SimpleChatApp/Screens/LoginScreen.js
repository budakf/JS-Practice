import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableHighlight, Keyboard, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import {auth} from '../FirebaseAuthentication'
import * as Font from 'expo-font'


export default class  LoginScreen extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            email:"",
            password:"",
            disabled:true,
            fontLoaded:false,
        }
        
    }

    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf')
        });
        this.setState({ fontLoaded: true })
        const uid = await AsyncStorage.getItem('uid')

        console.log(uid)
        if( uid !== null ){
            this.props.navigation.navigate("FriendListScreen")
        }
    }

    emailHandler = email => {
        this.setState( { email } , this.shoudEnabledButton)
    }

    passwordHandler = password => {
        this.setState( {password} , this.shoudEnabledButton)
    }

    shoudEnabledButton = () => {
        if( this.state.email !== "" && this.state.password !== "" ){
            this.changeButtonColorAndEnable(false)
        }else{
            this.changeButtonColorAndEnable(true)
        }
    }

    changeButtonColorAndEnable = (state)  => {
        this.setState({ disabled: state })
    }

    login = async () => {
        Keyboard.dismiss()
        try{ 
            auth.signInWithEmailAndPassword(this.state.email, this.state.password).then( () => this.routeAfterLogin()  ).catch( (error) => console.log(`${error}`) )
        }
        catch(error){
            Toast.show("Login error", Toast.LONG)
        }
    }

    routeAfterLogin = async () => {
        this.props.navigation.navigate('FriendListScreen')
        await AsyncStorage.setItem('uid', auth.currentUser.uid)
        await AsyncStorage.setItem('email', auth.currentUser.email)
        Toast.show('Login Successful', Toast.LONG)
    }

    signUp = () => {
        this.props.navigation.navigate("SignupScreen")
    }

    forgetPassword = () => {
        console.log("forget Password")
    }

    render(){
        
        return(
            <View style={styles.container}>
                    
                {  this.state.fontLoaded && <Text style={styles.appNameText} > Simple Chat App </Text> }

                <TextInput text={this.state.email} style={styles.input}
                    autoCapitalize='none'
                    placeholder='email'
                    onChangeText={ this.emailHandler } 
                />
                <TextInput  text={this.state.password} style={styles.input }
                    secureTextEntry
                    autoCapitalize='none'
                    placeholder='password'
                    onChangeText={ this.passwordHandler } 
                />
                
                <TouchableHighlight title="LoginTitle"
                    onPress={ this.login }
                    underlayColor='teal'
                    style={ [styles.loginButton, { backgroundColor: this.state.disabled ? '#82B2D0' : "#0F4B73"  } ] }
                    disabled={ this.state.disabled }
                >
                    <Text style={styles.loginText} > Login </Text>
                </TouchableHighlight>

                <Text onPress={ this.forgetPassword } style={styles.forgetPassword}  > 
                    Forget Password? 
                </Text>

                <Text style={styles.or}> OR </Text>

                <Text onPress={ this.signUp } style={styles.signUp}  > Don't have an account? 
                    <Text style = {{ color: '#82B2D0' }}> SignUp </Text>
                </Text>

            </View>
        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
        marginTop: StatusBar.currentHeight,
    },

    appNameText:{
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 30,
        fontFamily:"DancingScript",
    },

    input:{
        alignItems: "center",
        paddingTop:10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderColor:"lightgray",
        borderRadius:3,
        borderWidth:1,
        backgroundColor:'#F5F5F5',
    },

    loginButton:{
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius:3,
        backgroundColor:'#82B2D0',
    },

    loginText:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 100,
        marginRight: 100,
        color:"white",
        textAlign: 'center',
    },

    forgetPassword:{
        marginTop: 5,
        marginLeft: Dimensions.get('window').width - 160,
        color:'#82B2D0',
    },

    or:{
        fontSize: 14,
        marginTop: 25,
        alignSelf: 'center',
        color: '#A2A2A2'
    },

    loginWithFaceBookButton:{
        marginTop: 20,
        marginRight: 100,
        marginLeft: 100,
        textAlign: 'center',
        color:'#468499',
    },

    signUp:{
        marginTop: 10,
        textAlign: 'center',
    }




});





