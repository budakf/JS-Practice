import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableHighlight, Keyboard, Dimensions, Image } from 'react-native';
import Toast from 'react-native-simple-toast';
import {auth} from '../FirebaseAuthentication';
import * as Font from 'expo-font';


export default class  SignupScreen extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            email: "",
            name:"",
            surname:"",
            password: "",
            repassword: "",
            disabled: true,
        }

    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {}
        return{
            headerTitle: () => (
                <View>
                    { params.fontLoaded && <Text style={styles.headerText} > SimpleChatApp </Text>}
                </View>            
            ),
            headerStyle: { backgroundColor: "#0F4B73" },
            headerTintColor: 'white',
        }
    }

    async UNSAFE_componentWillMount(){
        await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf')
        });
        let fontLoaded = true 
        this.props.navigation.setParams({ 
            fontLoaded,
        });
    }

    emailHandler = email => {
        this.setState( { email } , this.shoudEnabledButton)
    }

    nameHandler = name => {
        this.setState( { name } , this.shoudEnabledButton)
    }

    surnameHandler = surname => {
        this.setState( { surname } , this.shoudEnabledButton)
    }

    passwordHandler = password => {
        this.setState( {password} , this.shoudEnabledButton)
    }    

    repasswordHandler = repassword => {
        this.setState( {repassword} , this.shoudEnabledButton)
    }

    shoudEnabledButton = () => {
        if( this.state.email !== "" && this.state.password !== "" && this.state.name !== "" && this.state.surname !== "" &&
            this.state.repassword !== "" && this.state.password === this.state.repassword ){
            this.changeButtonColorAndEnable(false)
        }else{
            this.changeButtonColorAndEnable(true)
        }
    }

    changeButtonColorAndEnable = (state)  => {
        this.setState({ disabled: state })
    }

    signUp = async () => {
        Keyboard.dismiss()
        try{
            const userData = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            fetch(`http://192.168.1.24:4040/users/add`, {  //       
                method: 'POST',
                headers:{ 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    user:{
                        "name": this.state.name, 
                        "uid": userData.user.uid,
                        "email": this.state.email,
                        "surname": this.state.surname,
                    }
                })
            })
            console.log(this.state.email)
            Toast.show('SignUp Successful', Toast.LONG)
            this.props.navigation.navigate('LoginScreen')
        }
        catch(error){
            Toast.show(`SignUp error${error}`, Toast.LONG)
        }
    }

    forgetPassword = () => {
        console.log("forget Password")
    }

    render(){

        return(
            <View style={styles.container}>

                <Image
                    style={styles.logo}
                    source={require('../assets/chat-app.png')}
                />

                <TextInput text={this.state.email} style={styles.input}
                    autoCapitalize='none'
                    placeholder='email'
                    onChangeText={ this.emailHandler } 
                />
                <TextInput text={this.state.name} style={styles.input}
                    autoCapitalize='none'
                    placeholder='name'
                    onChangeText={ this.nameHandler } 
                />
                <TextInput text={this.state.surname} style={styles.input}
                    autoCapitalize='none'
                    placeholder='surname'
                    onChangeText={ this.surnameHandler } 
                />
                <TextInput  text={this.state.password} style={styles.input }
                    secureTextEntry
                    autoCapitalize='none'
                    placeholder='password'
                    onChangeText={ this.passwordHandler } 
                />
                <TextInput  text={this.state.repassword} style={styles.input }
                    secureTextEntry
                    autoCapitalize='none'
                    placeholder='repassword'
                    onChangeText={ this.repasswordHandler } 
                />
                <TouchableHighlight title="SignupTitle"
                    onPress={ () => this.signUp() }
                    underlayColor='teal'
                    style={ [ styles.signupButton, { backgroundColor: this.state.disabled ? '#82B2D0' : "#0F4B73"  } ] }
                    disabled={ this.state.disabled }
                >
                    <Text style={styles.signupText} > Signup </Text>
                </TouchableHighlight>

            </View>
        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
    },

    logo: {
        width: 128,
        height: 120,
        alignSelf: 'center',
        marginBottom: StatusBar.currentHeight,
        marginTop: -2 * StatusBar.currentHeight,
    },

    appNameText:{
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 30,
        fontFamily:"DancingScript",
    },

    headerText:{
        fontSize: 25,
        color:"white",
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

    signupButton:{
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius:3,
        backgroundColor:'lightblue',
    },

    signupText:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 80,
        marginRight: 80,
        color:"white",
        textAlign: 'center',
    },

    forgetPassword:{
        marginTop: 5,
        marginLeft: Dimensions.get('window').width - 160,
        color:'#468499',
    },

    or:{
        fontSize: 14,
        marginTop: 25,
        alignSelf: 'center',
        color: '#A2A2A2'
    },

    signUp:{
        marginTop: 10,
        textAlign: 'center',
    }

});





